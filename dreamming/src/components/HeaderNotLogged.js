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

      </nav>
    </header>
  );
};

export default Header;
