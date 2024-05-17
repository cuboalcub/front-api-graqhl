import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import '../styles/header.css'; // Importa el archivo CSS

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="header-container"
    id = "header">
      <div className="header-content">
        <div className="logo">
          <Link to="/" className="no-underline black">
            CATS
          </Link>
        </div>
        <div className="menu">
          <Link to="/" className="menu-item">
            Foto de gatos
          </Link>
          {authToken && (
            <Link to="/create" className="menu-item">
              Subir gato
            </Link>
          )}
          {authToken ? (
            <div
              className="menu-item"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                navigate(`/`);
              }}
            >
              Cerrar sesion
            </div>
          ) : (
            <Link to="/login" className="menu-item">
              Iniciar sesion
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
