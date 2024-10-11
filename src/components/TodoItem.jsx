import React, { useState } from 'react';

const TodoItem = (props) => {
    const [showButtons, setShowButtons] = useState(false);

    const handleMouseEnter = () => {
        setShowButtons(true);
    };

    const handleMouseLeave = () => {
        setShowButtons(false);
    };

    const handleEdit = () => {
        console.log(`TodoItem > Edit index: ${props.index}, Edit ${props.item}`);
        //props.onEdit(props.index);
        const editData = {
            index: props.index,
            item: props.item,
        };
        props.onEdit(editData);
    };

    const handleDelete = () => {
        console.log(`TodoItem > handleDelete index: ${props.index}, Delete ${props.item}`);
        props.onDelete(props.index);
    };

    const convertNewlines = (text) => {
        return text.split('\n').map((str, index) => (
            <React.Fragment key={index}>
                {str}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div 
            className="todo-item" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            {/* {props.item} */}
            {convertNewlines(props.item)}
            {showButtons && (
                <span className="btn-group">
                    <button className="btn btn-warning btn-sm" onClick={handleEdit}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                </span>
            )}
        </div>
    );
};

export default TodoItem;
