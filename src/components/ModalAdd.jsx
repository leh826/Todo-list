import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';


function TaskModal({ isOpen, onClose, onAddTask }) {
    const [nome, setNome] = useState('');
    const [custo, setCusto] = useState('');
    const [dataLimite, setDataLimite] = useState('');

    const handleAdd = () => {
        if (!nome || !custo) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }
        const newTask = {
            nome,
            custo: parseFloat(custo),
            data_limite: dataLimite,
        };
        onAddTask(newTask);
        onClose();
        setNome('');
        setCusto('');
        setDataLimite('');
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Incluir nova Tarefa</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nome"
                    fullWidth
                    margin="normal"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                    label="Custo"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={custo}
                    onChange={(e) => setCusto(e.target.value)}
                />
                <TextField
                    label="Data Limite"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={dataLimite}
                    onChange={(e) => setDataLimite(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancelar</Button>
                <Button onClick={handleAdd} color="primary">Incluir</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskModal;
