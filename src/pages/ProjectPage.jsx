import '../index.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Projects from '../components/Projects'; 
import AddProjectModal from '../components/AddProjectModal';

let host = process.env.REACT_APP_GRAPHQL_ENDPOINT;
console.log('GraphQL endpoint:', host);
if (!host) {
  host = 'https://graphql-20240902.azurewebsites.net/graphql'; // Default to this if the environment variable is undefined
}

//Merge cache data from multiple sources    
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

const apolloClient = new ApolloClient({
    uri: host,
    cache: new InMemoryCache(),
});

function ProjectPage() {
    return (
    <>
        <ApolloProvider client={apolloClient}>      
            <br />
            <div className="container">
                <AddProjectModal />
                <Projects />
            </div>
        </ApolloProvider>      
    </>
    );
}

export default ProjectPage;



// import { Link, useParams } from 'react-router-dom';
// //import Spinner from '../components/Spinner';
// //import ClientInfo from '../components/ClientInfo';
// //import DeleteProjectButton from '../components/DeleteProjectButton';
// //import EditProjectForm from '../components/EditProjectForm';
// import { useQuery } from '@apollo/client';
// //import { GET_PROJECT } from '../queries/projectQueries';

// export default function Project() {
//     //const { id } = useParams();
//     //const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

//     //if (loading) return <Spinner />;
//     //if (error) return <p>Something Went Wrong</p>;

//     return (
//         <>
//         <h2>Project</h2>
        
//         {/* {!loading && !error && (
//             <div className='mx-auto w-75 card p-5'>
//             <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
//                 Back
//             </Link>

//             <h1>{data.project.name}</h1>
//             <p>{data.project.description}</p>

//             <h5 className='mt-3'>Project Status</h5>
//             <p className='lead'>{data.project.status}</p>

//             <ClientInfo client={data.project.client} />

//             <EditProjectForm project={data.project} />

//             <DeleteProjectButton projectId={data.project.id} />
//             </div>
//         )} */}
//         </>
//     );
// }