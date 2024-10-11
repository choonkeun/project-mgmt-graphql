import React, { useState } from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';
import { UPDATE_CLIENT, DELETE_CLIENT } from '../mutations/clientMutations';
import ClientModal from './ClientModal';

export default function ClientRow({ client, updateClientInList }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openUpdateModal = () => {
        setIsModalOpen(true);
    };
    
    const handleUpdateClient = (updatedClient) => {
        updateClientInList(updatedClient);
        setIsModalOpen(false);
    };
    
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },

        //Way 1: get client again (after delete a client) - working
        refetchQueries: [{ query: GET_CLIENTS }],

        //Way 2: update cache (after delete a client) - working
        // update(cache, { data: { deleteClient } }) {
        //     const { clients } = cache.readQuery({ query: GET_CLIENTS });
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {
        //             clients: clients.filter((client) => client.id !== deleteClient.id),
        //         },
        //     });
        // },
    });

    // const [updateClient] = useMutation(UPDATE_CLIENT, {
    //     variables: { id: client.id },
    //     refetchQueries: [{ query: GET_CLIENTS }],
    // });

    return (
        <>
            <tr>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td className='text-center'>
                    <button className='btn btn-primary btn-sm' onClick={openUpdateModal}>
                        <FaPen />
                    </button> 
                    &nbsp;
                    <button className='btn btn-danger btn-sm' onClick={deleteClient}>
                        <FaTrash />
                    </button>
                </td>
            </tr>
            {isModalOpen && (
                <ClientModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    client={client}
                    onUpdate={handleUpdateClient}
                />
            )}
        </>
    );
}