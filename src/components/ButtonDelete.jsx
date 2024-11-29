import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import AlertDialog from './DialogDelete';

export default function TaskRow({ task, handleDeleteTask }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

  return (
    <>
      <button className="icon-delete" onClick={openAlert}>
        <FaTrash />
      </button>
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={closeAlert}
        onDelete={() => handleDeleteTask(task.id)}
      />
    </>
  );
}
