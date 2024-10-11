import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CLIENT } from '../mutations/clientMutations';

export default function ClientModal({ isOpen, onClose, client, onUpdate }) {
    const [name, setName] = useState(client.name);
    const [email, setEmail] = useState(client.email);
    const [phone, setPhone] = useState(client.phone);

    const [updateClient] = useMutation(UPDATE_CLIENT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateClient({
                variables: {
                    id: client.id,
                    name,
                    email,
                    phone,
                },
            });
            onUpdate(data.updateClient);
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <>
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Client</h5>
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
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
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
                                Update Client
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
   );
}