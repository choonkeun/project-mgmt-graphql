import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = (props) => {

    const handleEdit = (editData) => {
        console.log(`TodoBoard > handleEdit index: ${editData.index}, ${editData.item}`);
        //props.onEdit(index, data);
        props.onEdit(editData);
    };

    const handleDelete = (index) => {
        console.log(`TodoBoard > handleDelete index: ${index}`);
        props.onDelete(index);
    }

    //-- when you maintain todo array on TodoBoard.jas then you can delete a todo item by passing the index of the todo item to the onDelete function
    // const [todos, setTodos] = useState([]);
    // const handleDelete = (index) => {
    //     console.log(`index: ${index}`);
    //     const newTodos = props.todoList.filter((_, i) => i !== index);
    //     //setTodos(newTodos);
    // };

    return (
        <div className="container">
            {props.todoList.map((item, index) => (
                <div key={index} className="list-group-item no-border">
                    <TodoItem item={item} index={index}  onEdit={props.onEdit} onDelete={props.onDelete} />
                    {/* <TodoItem item={item} index={index} onEdit={handleEdit} onDelete={handleDelete} /> */}
                </div>
            ))} 
        </div>
    );
};

export default TodoBoard;