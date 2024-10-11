import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function ProjectModal({ isOpen, onClose, project, onUpdate }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(project.status);
    const [clientId, setClientId] = useState(project.clientId);

    //Update Project
    const [updateProject] = useMutation(UPDATE_PROJECT);

    // Get Client For Dropdown
    const { loading, error, data } = useQuery(GET_CLIENTS);
    if (loading) return null;
    if (error) return 'Error Loading Clients...';
    //const clients = data.clients;      
 
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!clientId) {
            alert('Error: Client ID is required.');
            return;
        }
        
        let updatedStatus;
        switch (status) {
            case 'Not Started':
                updatedStatus = 'new';
                break;
            case 'In Progress':
                updatedStatus = 'progress';
                break;
            case 'Completed':
                updatedStatus = 'completed';
                break;
            default:
                updatedStatus = 'new';
        }
        
        try {
            const { data } = await updateProject({
                variables: {
                    id: project.id,
                    name,
                    description,
                    status: updatedStatus, 
                    clientId,
                },
            });
            onUpdate(data.updateProject);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <>
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Project</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <br />
                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>


                            <br />
                            <div className="form-group">
                                <label>Status</label>
                                <div className="radio-buttons">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Not Started"
                                            checked={status === 'Not Started'}
                                            onChange={handleStatusChange}
                                        />
                                        Not Started
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="In Progress"
                                            checked={status === 'In Progress'}
                                            onChange={handleStatusChange}
                                        />
                                        In Progress
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="Completed"
                                            checked={status === 'Completed'}
                                            onChange={handleStatusChange}
                                        />
                                        Completed
                                    </label>
                                </div>
                            </div>


                            <br />
                            <div className='form-group'>
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

                            <br />
                            <br />
                            <button
                                    type='button'
                                    className='btn btn-secondary'
                                    onClick={onClose}
                                >
                                Close
                            </button>
                            &nbsp;
                            <button type="submit" className="btn btn-primary">
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}