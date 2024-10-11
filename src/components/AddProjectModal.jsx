import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function AddProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new');
    const [clientId, setClientId] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    //Add Project
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        refetchQueries: [{ query: GET_PROJECTS }],
    });

    // useEffect(() => {
    //     const modal = document.getElementById('addProjectModal');
    //     if (isOpen) {
    //         modal.classList.add('show');
    //         modal.style.display = 'block';
    //         document.body.classList.add('modal-open');
    //     } else {
    //         modal.classList.remove('show');
    //         modal.style.display = 'none';
    //         document.body.classList.remove('modal-open');
    //     }
    // }, [isOpen]);

    // //Get Client For Dropdown
    const { loading, error, data } = useQuery(GET_CLIENTS);
    if (loading) return null;
    if (error) return 'Error Loading Clients...';
    //const clients = data.clients;      
    
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !description || !status || !clientId) {
            return alert('Please fill in all fields');
        }
        console.log(name, description, status, clientId);

        addProject();
        closeModal();
        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    };

    return (
        <>
            <button
                type='button'
                className='btn btn-secondary'
                onClick={openModal}
            >
                Add PROJECT
            </button>

            {isOpen && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div
                        className="modal fade show"
                        style={{ display: 'block' }}
                        id="addProjectModal"
                        aria-labelledby="addProjectModalLabel"
                        aria-hidden="true"
                    >
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title' id='addProjectModalLabel'>
                                        Add PROJECT
                                    </h5>
                                    <button
                                        type='button'
                                        className='btn-close'
                                        onClick={closeModal}
                                        aria-label='Close'
                                    ></button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className='modal-body'>
                                        <div className='mb-3'>
                                            <label htmlFor='name' className='form-label'>
                                                Name
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='name'
                                                placeholder='Enter Name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor='description' className='form-label'>
                                                Description
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='description'
                                                placeholder='Enter description'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="status">Status</label>
                                            <select
                                                id="status"
                                                className="form-select"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="new">Not Started</option>
                                                <option value="progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor='clientId' className='form-label'>
                                                Client
                                            </label>
                                            <select
                                                id='clientId'
                                                className='form-select'
                                                value={clientId}
                                                onChange={(e) => setClientId(e.target.value)}
                                            >
                                                <option value=''>Select Client</option>
                                                {data.clients.map((client) => (
                                                    <option key={client.id} value={client.id}>
                                                        {client.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='modal-footer'>
                                        <button
                                            type='button'
                                            className='btn btn-secondary'
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type='submit'
                                            className='btn btn-primary'
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
