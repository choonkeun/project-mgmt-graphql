import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function AddClientModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        refetchQueries: [{ query: GET_CLIENTS }],
    });

    useEffect(() => {
        const modal = document.getElementById('addClientModal');
        if (isOpen) {
            modal.classList.add('show');
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
        } else {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }, [isOpen]);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !phone) {
            return alert('Please fill in all fields');
        }
        console.log(name, email, phone);

        addClient();
        closeModal();
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <>
            <button
                type='button'
                className='btn btn-secondary'
                onClick={openModal}
            >
                Add Client
            </button>

            <div
                className='modal fade'
                id='addClientModal'
                aria-labelledby='addClientModalLabel'
                aria-hidden='true'
            >
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='addClientModalLabel'>
                                Add Client
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
                                    <label htmlFor='email' className='form-label'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='email'
                                        placeholder='Enter Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='phone' className='form-label'>
                                        Phone
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='phone'
                                        placeholder='Enter Phone'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
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
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
}