// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1>Minha Aplicação</h1>
      <nav>
        <button onClick={() => navigate('/')}>Inicio</button>
        <button onClick={() => navigate('/prechaves')}>Pré Chaves</button>
        <button onClick={() => navigate('/poschaves')}>Pós Chaves</button>
        <button onClick={() => navigate('/parc')}>Parcelas</button>
        <button onClick={() => navigate('/SegObra')}>Seguro Obra</button>
      </nav>
    </header>
  );
};

export default Header;
