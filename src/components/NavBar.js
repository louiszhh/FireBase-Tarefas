
import React from 'react';
import './NavBar.css';

const NavBar = ({ onLogout, user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Sistema de Tarefas</h1>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">Olá, {user.email}</span>
            <button className="navbar-button" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <span>Faça login ou registro para acessar suas tarefas</span>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
