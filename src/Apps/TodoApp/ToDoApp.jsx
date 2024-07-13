import React, { useState } from 'react';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/WindowManager';
import "./style.css"

const TodoApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const Open =() => {
    setIsOpen(true);
  }

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <>
        <div>
        <button onClick={Open} className="App--Icon">
          <img src="  https://imgs.search.brave.com/0bhz3d3v49ZUwn3_y6EmhXZlNiW7wEA3rP28UFNORI8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzQ3LzA0LzU4/LzM2MF9GXzU0NzA0/NTg1Nl9RdkR1VURz/UTVQRTlyS3V1RDlq/Q2NqRUVhaWtXekh0/bC5qcGc" />
        </button>
      </div>
      {isOpen && (
        <WindowManager title="Todo App" onClose={handleClose}>
          <div className="todo-app">
            <input
              type="text"
              value={newTodo}
              onChange={handleInputChange}
              placeholder="Add new todo"
              className="todo-input"
            />
            <button onClick={handleAddTodo} className="add-button">
              Add
            </button>
            <ul className="todo-list">
              {todos.map((todo, index) => (
                <li key={index} className="todo-item">
                  {todo}
                  <button onClick={() => handleDeleteTodo(index)} className="delete-button">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </WindowManager>
      )}
    </>
  );
};

export default TodoApp;