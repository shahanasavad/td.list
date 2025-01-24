import React from 'react';
 import Update from './Update';

function Table({ tasks, onEdit, onDelete }) {
  return (
    <table className='ms-2 d-flex justify-content-between mt-5 me-5 ms-3'>
      
      <tbody>
        {tasks.map((task) => (
          <Update key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
