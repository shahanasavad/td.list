const API_URL = 'http://localhost:3000/tasks';

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const updateTask = async (task) => {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
}
export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};