import  { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import moment from 'moment';

function ModalUpdate({ isOpen, onClose, taskData, onUpdateTask }) {
    const [nome, setNome] = useState('');
    const [custo, setCusto] = useState('');
    const [dataLimite, setDataLimite] = useState('');
    const [loading, setLoading] = useState(false);

    const normalizeCusto = (valor) => {
        if (!valor) return '';
        return parseFloat(valor.toString().replace(/[^0-9.]/g, '')).toString();
    };

    useEffect(() => {
        if (taskData && isOpen) {
            console.log("Dados da tarefa recebidos:", taskData);
            setNome(taskData.nome || '');
            setCusto(normalizeCusto(taskData.custo));
            setDataLimite(
                taskData.data_limite
                    ? moment(taskData.data_limite).format('YYYY-MM-DD')
                    : ''
            );
        }
    }, [taskData, isOpen]);

    const handleUpdate = async () => {
        if (!nome.trim()) {
            alert("O nome é obrigatório.");
            return;
        }
        const numericCusto = custo ? parseFloat(custo) : null;

        if (isNaN(numericCusto)) {
            alert("Custo inválido.");
            return;
        }
        const updatedTask = {
            id: taskData.id,
            nome,
            custo: numericCusto,
            data_limite: dataLimite,
        };

        try {
            setLoading(true);
            await onUpdateTask(updatedTask);
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle>Atualizar Tarefa</DialogTitle>
            <DialogContent>
                {loading ? (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" disabled={loading}>
                    Cancelar
                </Button>
                <Button onClick={handleUpdate} color="primary" disabled={loading}>
                    {loading ? 'Atualizando...' : 'Atualizar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalUpdate;
