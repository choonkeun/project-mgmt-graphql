//npm install bootstrap
//npm install react-bootstrap

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import TodoBoard from '../components/TodoBoard';
import EditModal from '../components/TodoEditModal';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentEdit, setCurrentEdit] = useState(null);

    const handleEditTodo = (editData) => {
        console.log(`Todos > handleEditTodo index: ${editData.index}, ${editData.item}`);
        setCurrentEdit(editData);
    }   

    const handleSave = (index, newItem) => {
        const newTodos = todos.map((item, i) => (i === index ? newItem : item));
        setTodos(newTodos);
        setCurrentEdit(null);
    };


    const handleDeleteTodo = (index) => {
        console.log(`Todos > handleDeleteTodo index: ${index}`);
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, inputValue]);
            setInputValue('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-left">To-Do List</h1>
{/* 
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter a new task" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyUp={handleKeyPress}
                /> &nbsp;
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={handleAddTodo}>
                        Add
                    </button>
                </div>
            </div>
 */}
            <div className="input-group mb-3">
                <textarea 
                    className="form-control" 
                    placeholder="Enter a new task" 
                    value={inputValue} 
                    rows="2"
                    onChange={(e) => setInputValue(e.target.value)} 
                    //onKeyUp={handleKeyPress}
                ></textarea> &nbsp;
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={handleAddTodo}>
                        Add
                    </button>
                </div>
            </div>

            <ul className="list-group">
                <TodoBoard todoList={todos} onEdit={handleEditTodo} onDelete={handleDeleteTodo}  />
                {currentEdit && (
                    <EditModal
                        show={true}
                        onHide={() => setCurrentEdit(null)}
                        onSave={handleSave}
                        item={currentEdit.item}
                        index={currentEdit.index}
                    />
                )}
            </ul>
        </div>
    );
};

export default Todos;

