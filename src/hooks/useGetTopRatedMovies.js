// PS C:\NEXT\project-mgmt-graphql\client> npm i @tanstack/react-query
// "@tanstack/react-query": "^5.59.6",
// You need restar to use .env file: process.env.REACT_APP_TMDB_API_KEY (Read-Access Token)

import { useInfiniteQuery } from "@tanstack/react-query";

const fetchTopRatedMovies = async(page) => {
    //console.log(process.env.REACT_APP_TMDB_API_KEY);
    //const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_TMDB_API_KEY}` 
        }
    });
    const data = await response.json();
    return data;    
}

const useGetTopRatedMovies = () => {
    return useInfiniteQuery({
        queryKey: ["top-rated-movie"],
        queryFn: ({pageParam = 1}) => fetchTopRatedMovies(pageParam),
        getNextPageParam: (lastPage, pages) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
        },
        //initialPageParam: 1,
    });
}; 

export default useGetTopRatedMovies;
