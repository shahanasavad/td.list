import React, { useState, useEffect } from 'react';
 import Edit from './components/Edit';
 import Table from './components/Table';
  import { fetchTasks, createTask, updateTask, deleteTask } from './server/allAPI';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleUpdateTask = async (updatedTask) => {
    const task = await updateTask(updatedTask);
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    setEditingTask(null);
  };

  const handleCreateTask = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

 

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className=" ">
      <h1 className='text-center text-warning bg-success'>Todo List</h1>
      <Edit
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialData={editingTask}
        onCancel={() => setEditingTask(null)}
      />
      <Table
        tasks={tasks}
        onEdit={(task) => setEditingTask(task)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;
