import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pos from './components/posComponents/PosChaves';
import Pre from './components/preComponents/PreChaves';
import SegObra from './components/preComponents/SegObra';
import Parc from './components/posComponents/Parcelas';
import Header from './components/Header';
import HeaderNot from './components/HeaderNotLogged';
import './App.css';
import api from './API/api';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      if (response.status === 200) {
        setIsLogged(true);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Login inválido');
    }
  };

  return (
    <Router>
      <div className="app">
        <div className="stars"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>

        {!isLogged ? (
          <>
            <HeaderNot />
            <div className="login-container">
              <div className="card shadow p-4 login-card">
                <h4 className="text-center mb-4">Faça Login para continuar</h4>
                <form onSubmit={handleLogin}>
                  <div className="text-center mb-3">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                      alt="Avatar"
                      className="rounded-circle"
                      style={{ width: '100px' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Usuário  
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Digite seu nome"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Senha
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <Header />
            <div className="container text-center mt-4">
            <h1 style={{ color: 'white' }}>Bem-vindo ao Nosso Sistema de Organização de Parcelas</h1>
            </div>
            <Routes>
              <Route path="/poschaves" element={<Pos />} />
              <Route path="/prechaves" element={<Pre />} />
              <Route path="/Parcela" element={<Parc />} />
              <Route path="/SegObra" element={<SegObra />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
