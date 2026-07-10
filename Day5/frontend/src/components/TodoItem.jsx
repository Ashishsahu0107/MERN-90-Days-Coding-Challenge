import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.is_completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={() => onToggle(todo._id, !todo.is_completed)}
        className="todo-checkbox"
      />
      <span className="todo-title">{todo.title}</span>
      <button
        onClick={() => onDelete(todo._id)}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;