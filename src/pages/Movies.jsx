
//npm i @emotion/styled
//npm i @mui/material
//npm i @mui/system
//npm i react-intersection-observer ---> for infinite scroll

import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled'; // Use '@emotion/styled' or 'styled-components' depending on your setup
import { Grid, Tooltip } from '@mui/material'
//import { Grid, styled } from '@mui/system'; 
import useGetTopRatedMovies from '../hooks/useGetTopRatedMovies';
import { useInView,} from 'react-intersection-observer';
import '../index.css';

const MovieContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    //flexWrap: "wrap", // Allow images to wrap
    alignItems: "center",
    height: "100%",
    marginTop: "10px",
    marginBottom: "10px",
}));

const MovieItem = styled("div")(({ theme }) => ({
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    height: "100%",
    textAlign: "center",
}));

const MovieImage = styled("img")(({ theme }) => ({
    width: "200px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
}));

const MovieTitle = styled("h2")(({ theme }) => ({
    fontSize: "1.2rem",
    margin: "10px 0 5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "200px",
}));


const Movies = (props) => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetching, isFetchNextPage } = useGetTopRatedMovies();
    const { ref, inView } = useInView();
    const scrollPositionRef = useRef(0);

    console.log("data: ", data);

    useEffect(() => {
        console.log("Need more Movies?", inView);
        if (inView && hasNextPage && !isFetchNextPage) {

            // Move the window to the top of the scroll position - not working
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            //scrollPositionRef.current = window.scrollY / scrollHeight;
            scrollPositionRef.current = scrollHeight;
            console.log("window.scrollY: ", window.scrollY);
            console.log("scrollHeight: ", scrollHeight);
            console.log("scrollPositionRef.current: ", scrollPositionRef.current);

            const timer = setTimeout(() => {
                fetchNextPage().then(() => {
                    window.scrollTo({
                        top: 0,
                        left: scrollPositionRef.current,
                        behavior: "smooth",
                    });
                });
            }, 500); // 0.5 seconds delay
            return () => clearTimeout(timer);
        }
    }, [inView, hasNextPage, isFetchNextPage]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error.message}</div>;
    if (isFetching) return <div>Fetching...</div>;

    let movieIndex = 0;

    return (
        <div className='container'>
            <h3>Movies - Top Rated (Infinite scrolling)</h3>
            <Grid container spacing={4}>
                {data?.pages.map((page, index) => (
                    page.results.map((movie) => (
                        <MovieContainer item sm={4} md={3} xs={12} key={movie.id}>
                            <MovieItem>
                                <div className="movie-number">{++movieIndex}</div>
                                    <Tooltip title={
                                    <div>
                                        <div style={{ fontSize: '1.0rem', fontWeight: 'bold' }}>Overview:</div>
                                        <div style={{ fontSize: '0.8rem' }}>{movie.overview}</div>
                                        <div style={{ fontSize: '1.0rem', fontWeight: 'bold', marginTop: '10px' }}>Release Date:</div>
                                        <div style={{ fontSize: '0.8rem' }}>{movie.release_date}</div>
                                    </div>
                                    }>
                                    <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                    </Tooltip>
                                <MovieTitle>{movie.title}</MovieTitle>
                            </MovieItem>
                        </MovieContainer>
                    ))
                ))}
            </Grid>
            <h1 ref={ref} style={{ textAlign: 'center' }}>
                {hasNextPage ? "Load More ..." : ""}
            </h1>
        </div>
    );
};

export default Movies;