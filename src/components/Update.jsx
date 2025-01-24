import React from 'react';

function Update({ task, onEdit, onDelete }) {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.deadline}</td>
      <td>{task.priority}</td>
      <td>{task.completed ? 'Yes' : 'No'}</td>
      <td>
        <button className='ms-3 btn btn-primary btn-sm me-2' onClick={() => onEdit()}>Edit</button>
        <button  className="ms-3  btn btn-warning btn-sm me-2"onClick={() => onDelete(task.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Update;