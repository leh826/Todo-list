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
        <Dialog 
            open={isOpen} 
            onClose={onClose} 
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    maxWidth: '400px',
                    width: '100%',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                }
            }}
        >
            <DialogTitle 
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    textAlign: 'center',
                    marginBottom: '15px',
                }}
            >
                Incluir nova Tarefa
            </DialogTitle>
            <DialogContent 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    padding: '0 20px',
                }}
            >
                <TextField
                    label="Nome"
                    fullWidth
                    margin="normal"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                />
                <TextField
                    label="Custo"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={custo}
                    onChange={(e) => setCusto(e.target.value)}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                />
                <TextField
                    label="Data Limite"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={dataLimite}
                    onChange={(e) => setDataLimite(e.target.value)}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                />
            </DialogContent>
            <DialogActions 
                sx={{
                    justifyContent: 'center',
                    paddingTop: '10px',
                }}
            >
                <Button 
                    onClick={onClose} 
                    sx={{
                        color: '#F24171',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '10px 20px',
                    }}
                >
                    CANCELAR
                </Button>
                <Button 
                    onClick={handleAdd} 
                    sx={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '10px 20px',
                        '&:hover': {
                            backgroundColor: '#218838',
                        }
                    }}
                >
                    INCLUIR
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskModal;
