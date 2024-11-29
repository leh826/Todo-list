import api from '../lib/axiosConfig';
import { useState, useEffect } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/task?order=ordem_apresentacao');
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTaskById = async (id) => {
    try {
      const response = await api.get(`/task?id=eq.${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await api.post('/task', newTask);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/task?id=eq.${id}`);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await api.put(`/task?id=eq.${id}`, updatedTask);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const checkTaskNameExists = async (nome) => {
    try {
      const nomeCodificado = encodeURIComponent(nome);
      const response = await api.get(`/task?nome=eq.${nomeCodificado}`);
      return response.data.length > 0;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const updateTaskOrder = async (id, newOrder) => {
    try {
      const response = await api.patch(`/task?id=eq.${id}`, { ordem_apresentacao: newOrder });
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    getTaskById,
    addTask,
    deleteTask,
    updateTask,
    checkTaskNameExists,
    updateTaskOrder,
  };
};
