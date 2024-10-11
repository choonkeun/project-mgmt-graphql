import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
    mutation AddProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!) 
    {
        addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
            id
            name
            description
            status
            clientId
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation UpdateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate!, $clientId: ID!) 
    {
        updateProject(id: $id, name: $name, description: $description, status: $status, clientId: $clientId) 
        {
            id
            name
            description
            status
            clientId
        }
    }

`;

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
            name
        }
    }
`;

export { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT };

