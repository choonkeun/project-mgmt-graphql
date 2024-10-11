import '../index.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from '../components/Clients'; 
import AddClientModal from '../components/AddClientModal';

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

function ClientPage() {
    return (
    <>
        <ApolloProvider client={apolloClient}>      
            <br />
            <div className="container">
                <AddClientModal />
                <Clients />
            </div>
        </ApolloProvider>      
    </>
    );
}

export default ClientPage;
