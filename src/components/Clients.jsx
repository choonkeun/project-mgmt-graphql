import { gql, useQuery } from '@apollo/client';               

import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function Clients() {

    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>; 
    if (!data) return <p>No data</p>;       

    return (
        <>
            {!loading && !error && (
            <table className='table table-hover mt-3'>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.clients.map((client) => (
                    <ClientRow key={client.id} client={client} />
                ))}
                </tbody>
            </table>
            )}
        </>
    );
}   
