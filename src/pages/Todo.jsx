import React, { useState } from 'react';
import './Todo.css';
import TaskModal from '../components/ModalAdd';
import ModalUpdate from '../components/ModalUpdate';
import TaskRow from '../components/ButtonDelete';
import { FaEdit, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTaskContext } from '../context/TaskContext';
import moment from 'moment';

function TodoList() {
    const {
        tasks,
        loading,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        handleGetTaskById,
        handleMoveTaskUp,
        handleMoveTaskDown
    } = useTaskContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTaskData, setSelectedTaskData] = useState(null);

    const getCustoClass = (custo) => {
        const numericCusto = Number(custo.toString().replace(/[^0-9.-]+/g, ''));
        return numericCusto >= 1000 ? (
            <span className="valor-alto">R${numericCusto}</span>
        ) : (
            <span>R${numericCusto}</span>
        );
    };

    const handleEditTask = async (taskId) => {
        const taskData = await handleGetTaskById(taskId);
        console.log('Tarefa selecionada:', taskData);
        setSelectedTaskData(taskData);
        setIsUpdateModalOpen(true);
    };

    return (
        <div className="to-do-list">
            <ToastContainer />
            <h1>Sistema Gerenciador de Tarefas</h1>
            <div className="container">
                <h3>Tarefas</h3>
                <hr />
                {loading ? (
                    <p>Carregando...</p>
                ) : tasks.length === 0 ? (
                    <p>Nenhuma tarefa adicionada ainda</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr className="colum">
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Custo</th>
                                <th>Data Limite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={task.id}>

                                    <td className="campo">{task.id}</td>
                                    <td className="campo">{task.nome}</td>
                                    <td className="campo">{getCustoClass(task.custo)}</td>
                                    <td className="campo">
                                        {task.data_limite
                                            ? moment(task.data_limite).format('DD/MM/YYYY')
                                            : 'Sem data'}
                                    </td>
                                    <td className="icones">
                                        {index < tasks.length - 1 && index != 0 && (
                                            <button
                                                className="icon-move"
                                                onClick={() => handleMoveTaskDown(task.id)}
                                            >
                                                <FaArrowDown />
                                            </button>
                                        )}

                                        <TaskRow task={task} handleDeleteTask={handleDeleteTask} />
                                        <button
                                            className="icon-edit"
                                            onClick={() => handleEditTask(task.id)}
                                        >
                                            <FaEdit />
                                        </button>

                                        {index > 0 && index != tasks.length - 1 && (
                                            <button
                                                className="icon-move"
                                                onClick={() => handleMoveTaskUp(task.id)}
                                            >
                                                <FaArrowUp />
                                            </button>
                                        )}
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                )}

            </div>
            <button className="add-button" onClick={() => setIsModalOpen(true)}>
                Adicionar Tarefa
            </button>
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTask={handleAddTask}
            />
            <ModalUpdate
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                taskData={selectedTaskData}
                onUpdateTask={handleUpdateTask}
            />
        </div>
    );
}

export default TodoList;
