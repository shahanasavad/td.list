import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    list: '',
    description: '',
    deadline: '',
    priority: '',
    completed: false,
  });

  // Fetch tasks from the JSON server
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const createTask = async () => {
    try {
      const response = await axios.post(API_URL, newTask);
      setTasks((prev) => [...prev, response.data]);
      setNewTask({ list: '', description: '', deadline: '', priority: '', completed: false });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedTask);
      setTasks((prev) => prev.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <h1  className='text-center text-warning bg-success'>To-Do List</h1>

      {/* Task Form */}
      <div className='d-flex justify-content-between mt-5 me-5 ms-3'>

        <h2 >Create Task</h2>
        <input
          type="text"
          name="list"
          placeholder="List Name"
          value={newTask.list}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleChange}
        />
       
        <select name="priority" value={newTask.priority} onChange={handleChange}>
          <option value="">status</option>
          <option value="Low">Low</option>
          <option value="High">High</option>
        </select>
        {/* <label>
          <input
            type="checkbox"
            name="completed"
            checked={newTask.completed}
            onChange={handleChange}
          />
          Completed
        </label> */}
        <button onClick={createTask}>Add Task</button>
      </div>

      {/* Task Table */}
      <table  className='ms-4 me-3 mt-4 d-flex justify-content-between mt-5 me-5 ms-3' >
      
      
        <tbody >
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.list}</td>
              <td>{task.description}</td>
              <td>{task.deadline}</td>
              <td>{task.priority}</td>
              <td className='ms-4 me-3 mt-4 my-3'>{task.completed ? 'Yes' : 'No'}</td> 
              <td  >
                <button  className='ms-3 btn btn-primary btn-sm me-2' onClick={() => updateTask(task.id, { ...task, completed: !task.completed })}>
                 Complete
                </button>
                <button  className='ms-3 btn btn-danger btn-sm me-2' onClick={() => deleteTask(task.id)}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
