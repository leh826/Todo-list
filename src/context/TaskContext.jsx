import React, { createContext, useContext, useEffect } from 'react';
import { useTasks } from '../hooks/useTask';
import { toast } from 'react-toastify';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const {
        tasks,
        loading,
        fetchTasks,
        addTask,
        deleteTask,
        updateTask,
        checkTaskNameExists,
        updateTaskOrder,
        getTaskById,
    } = useTasks();

    const handleAddTask = async (newTask) => {
        try {
            const exists = await checkTaskNameExists(newTask.nome);
            if (exists) {
                toast.error('Uma tarefa com este nome já existe.');
                return;
            }
            await addTask(newTask);
            toast.success('Tarefa adicionada com sucesso!');
            fetchTasks();
        } catch (error) {
            toast.error('Erro ao adicionar tarefa');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            toast.success('Tarefa excluída com sucesso!');
            fetchTasks();
        } catch (error) {
            toast.error('Erro ao excluir tarefa');
        }
    };

    const handleGetTaskById = async (taskId) => {
        try {
            const task = await getTaskById(taskId);
            return task[0];
        } catch (error) {
            toast.error('Erro ao buscar tarefa');
            return null;
        }
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const exists = await checkTaskNameExists(updatedTask.nome);
            if (exists) {
                toast.error('Uma tarefa com este nome já existe.');
                return;
            }
            const custoString =
                typeof updatedTask.custo === 'number'
                    ? updatedTask.custo.toFixed(2)
                    : updatedTask.custo.toString();

            const updatedTaskWithFormattedCusto = {
                ...updatedTask,
                custo: custoString,
            };

            console.log('Dados da tarefa a serem enviados:', updatedTaskWithFormattedCusto);
            await updateTask(updatedTask.id, updatedTaskWithFormattedCusto);

            toast.success('Tarefa atualizada com sucesso');
            fetchTasks();
        } catch (error) {
            toast.error('Erro ao atualizar tarefa');
        }
    };

    const handleMoveTaskUp = async (taskId) => {
        try {
            const taskIndex = tasks.findIndex((task) => task.id === taskId);
            //verifica se a tarefa não é a primeira e não está trocando com a primeira
            if (taskIndex > 0 && taskIndex < tasks.length && taskIndex != 1) {
                const currentTask = tasks[taskIndex];
                const previousTask = tasks[taskIndex - 1];
    
                //verifica se a tarefa anterior não é a primeira
                if (previousTask.id !== tasks[0].id) {
                    const currentTaskOrder = currentTask.ordem_apresentacao;
                    const previousTaskOrder = previousTask.ordem_apresentacao;
    
                    await updateTaskOrder(currentTask.id, previousTaskOrder);
                    await updateTaskOrder(previousTask.id, currentTaskOrder);
                    fetchTasks();
                }
            }else{
                toast.error('Não é possível mover a tarefa para a primeira posição');
            }
        } catch (error) {
            console.error('Erro ao mover tarefa:', error);
            toast.error('Erro ao mover tarefa para cima');
        }
    };
    
    const handleMoveTaskDown = async (taskId) => {
        try {
            const taskIndex = tasks.findIndex((task) => task.id === taskId);
            //verifica se a tarefa não é a última e não está trocando com a última
            if (taskIndex < tasks.length - 1 && taskIndex >= 0 && taskIndex != tasks.length - 2) {
                const currentTask = tasks[taskIndex];
                const nextTask = tasks[taskIndex + 1];
    
                //verifica se a tarefa seguinte não é a última
                if (nextTask.id !== tasks[tasks.length - 1].id) {
                    const currentTaskOrder = currentTask.ordem_apresentacao;
                    const nextTaskOrder = nextTask.ordem_apresentacao;
    
                    await updateTaskOrder(currentTask.id, nextTaskOrder);
                    await updateTaskOrder(nextTask.id, currentTaskOrder);
    
                    fetchTasks();
                }
            }else{
                toast.error('Não é possível mover a tarefa para a última posição');
            }
        } catch (error) {
            console.error('Erro ao mover tarefa:', error);
            toast.error('Erro ao mover tarefa para baixo');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                handleAddTask,
                handleDeleteTask,
                handleUpdateTask,
                handleGetTaskById,
                handleMoveTaskUp,
                handleMoveTaskDown,
                fetchTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

