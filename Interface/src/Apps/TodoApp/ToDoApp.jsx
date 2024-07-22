import "./ToDoApp.css";
import React, { useState } from 'react';
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';
import logo from './icon.svg';

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
          <img src={logo} />
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