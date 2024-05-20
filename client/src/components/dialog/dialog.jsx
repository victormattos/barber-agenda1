import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        nome: props.nome,
        email: props.email,
        fone: props.fone,
        data: props.data,
        hora: props.hora,
    });

    const handleEditValues = () => {
        axios.put(`https://igor-dias-barber-agendamentos-production.up.railway.app/api`, {
            id: editValues.id,
            nome: editValues.nome,
            email: editValues.email,
            fone: editValues.fone,
            data: editValues.data,
            hora: editValues.hora,
        })
        .then(response => {
            console.log("Server response:", response);
            console.log("Edited data:", editValues);
            handleClose();
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    const handleDeleteCliente = () => {
        axios.delete(`https://igor-dias-barber-agendamentos-production.up.railway.app/api/delete/${editValues.id}`)
        .then(response => {
            console.log("Deleted client:", editValues.id);
            handleClose();
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    const handleChangeValues = (value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    }

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Title"
                        defaultValue={props.nome}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="E-mail"
                        defaultValue={props.email}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fone"
                        label="Telefone"
                        defaultValue={props.fone}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="data"
                        label="Data"
                        defaultValue={props.data}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="hora"
                        label="Hora"
                        defaultValue={props.hora}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancela</Button>
                    <Button onClick={handleEditValues}>Grava</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
