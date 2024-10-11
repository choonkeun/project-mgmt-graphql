import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditModal = (props) => {
    const [inputValue, setInputValue] = useState(props.item);

    const handleSave = () => {
        props.onSave(props.index, inputValue);
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <input 
                    type="text" 
                    className="form-control" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                /> */}
                <textarea 
                    className="form-control" 
                    rows="5" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
