import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Todo';
import AddTarefa from '../components/ModalUpdate';
import UpdateTarefa from '../components/ModalAdd';
import DialogDelete from '../components/DialogDelete';
import ButtonDelete from '../components/ButtonDelete';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/updateTarefa/:id" element={<UpdateTarefa />} />
                <Route path="/addTarefa" element={<AddTarefa />} />
                <Route path="/dialog" element={<DialogDelete />} />
                <Route path="/buttonDelete" element={<ButtonDelete />} />
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </Router>
    );
};

export default AppRouter;
