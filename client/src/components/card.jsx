import React, { useState} from "react";
import "./card.css"
import FormDialog from "./dialog/dialog";
import axios from "axios";


const Card = (props) => {
    const [open, setOpen] = React.useState(false);

    const cardOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteCliente = () => {
        axios.delete(`https://barber-agenda1.vercel.app/api/delete/${props.id}`);
    }

    return (
        <>
        <FormDialog open={open} setOpen={setOpen} id={props.id} nome={props.nome} email={props.email} fone={props.fone}
            data={props.data} hora={props.hora} />
        <div className="cliente-card">
            <div className="info">
                <h4>{props.nome}</h4>
                <p>{props.email}</p>
                <p>{props.fone}</p>
                <p>{props.data}</p>
                <p>{props.hora}</p>
            </div>
            <div className="actions">
                <button className="edit" onClick={cardOpen}>Editar</button>
                <button className="delete" onClick={handleDeleteCliente}>Apagar</button>
            </div>
        </div>
        </>
    );
};

export default Card;
