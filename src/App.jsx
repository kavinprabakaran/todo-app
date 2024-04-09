import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'todoName') {
      setTodoName(value);
    } else if (name === 'todoDescription') {
      setTodoDescription(value);
    }
  };

  const handleAddTodo = () => {
    if (todoName.trim() === '' || todoDescription.trim() === '') {
      alert('Please enter both Todo Name and Description.');
      return;
    }
    const newTodo = {
      id: Date.now(),
      name: todoName,
      description: todoDescription,
      status: 'Not Completed'
    };
    setTodos([...todos, newTodo]);
    setTodoName('');
    setTodoDescription('');
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo =>
    statusFilter === 'All' || todo.status === statusFilter
  );

  return (
    
    <div className="app">
      <div className="add-todo">
    
        <input
          type="text"
          name="todoName"
          placeholder="Todo Name"
          value={todoName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="todoDescription"
          placeholder="Todo Description"
          value={todoDescription}
          onChange={handleChange}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className="filter">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      <div className="todos">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="todo-card">
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(todo.id, e.target.value)}
            >
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
