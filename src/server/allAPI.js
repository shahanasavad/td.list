const API_URL = 'http://localhost:3000/tasks';

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};


export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};