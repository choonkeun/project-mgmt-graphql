import Spinner from './Spinner';
import { gql, useQuery } from '@apollo/client';               
import ProjectRow from './ProjectRow';
//import ProjectCard from './ProjectCard';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;
    if (!data) return <p>No data</p>;       

    return (
        <>
            {!loading && !error && (
            <table className='table table-hover mt-3'>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>ClientId</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.projects.map((project) => (
                    <ProjectRow key={project.id} project={project} />
                ))}
                </tbody>
            </table>
            )}
        </>
    );
}
