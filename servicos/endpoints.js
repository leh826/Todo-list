import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:3000' ,
});
//'http://198.100.158.191:3000'
export const getTasks = async () => {
 return await api.get('/task?order=ordem_apresentacao');
};
export const getTaskById = async (id) => {
    return await api.get(`/task?id=eq.${id}`);
   };
export const addTask = async (newTask) => {
    api.post('/task',  newTask);
};
export const deleteTask = async (id) => {
    return await api.delete(`/task?id=eq.${id}`);
};
export const updateTask = async (id, updatedTask) => {
    return await api.put(`/task?id=eq.${id}`, updatedTask);
};
export const checkTaskNameExists = async (nome) => {
    const nomeCodificado = encodeURIComponent(nome);
    return await api.get(`/task?nome=eq.${nomeCodificado}`);
};
export const updateTaskOrder = async (id, newOrder) => {
    return await api.patch(`/task?id=eq.${id}`, { ordem_apresentacao: newOrder });
};
