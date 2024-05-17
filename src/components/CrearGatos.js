import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREAR_GATOS = gql`
  mutation CreateGato($nombre: String!, $imagen: String!) {
    createGato(nombre: $nombre, imagen: $imagen) {
      id
      imagen
      nombre
      postedBy {
        id
        username
        email
      }
    }
  }
`;

const CrearGatos = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        nombre: "",
        imagen: ""
    });

    const [createGato] = useMutation(CREAR_GATOS,{
        variables: {
            nombre: formState.nombre,
            imagen: formState.imagen
        },
        onCompleted: () => navigate('/')
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createGato();
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={formState.nombre}
                        onChange={handleInputChange}
                        name="nombre"
                        type="text"
                        placeholder="Gato's Name"
                    />
                    <input
                        className="mb2"
                        value={formState.imagen}
                        onChange={handleInputChange}
                        name="imagen"
                        type="text"
                        placeholder="URL for Gato's Image"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CrearGatos;
