import React, { useState, useEffect } from 'react';

function Edit({ onSubmit, initialData, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDeadline(initialData.deadline);
      setPriority(initialData.priority);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, deadline, priority, status, id: initialData?.id });
    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority('Low');
    setStatus(false);
  };

  return (
    <form  className='d-flex justify-content-between mt-5 me-5 ms-3'onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="High">High</option>
      </select>
      <label>
       status:
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
      </label>
      <button type="submit">{initialData ? 'Update' : 'Add'} Task</button>
      {initialData && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default Edit;