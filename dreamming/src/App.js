import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pos from './components/PosChaves';
import Pre from './components/PreChaves';
import Header from './components/Header';
import './App.css';
import api from '../API/api'; // Importando a instância do axios configurada



const App = () => {
const [isLogged, isLoggedData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
    const handleLogin = async (username, password) => {
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
        <Header />


    
        <h1>Bem-vindo ao Nosso Sistema de Organização de Parcelas</h1>
           {!isLogged ? (
        <div>
          Faça Login para continuar:
          <div> ) 
              <form method="post">
                <div>
                  <img src="img_avatar2.png" alt="Avatar" />
                </div>
            
                <div >
                  <label htmlFor="name"><b>Username</b></label>
                  <input type="text" placeholder="Enter Username" name="name"  value={username}
                  onChange={(e) => setUsername(e.target.value)} required/>
            
                  <label htmlFor="Password"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" name="Password"  value={password}
                  onChange={(e) => setPassword(e.target.value)} required/>
                    
                  <button type="submit">Login</button>
                </div>
          
              </form>
           : ( 
          </div>
        </div>
  
        <Routes>
        <Route path="/poschaves" element={<Pos />} />
        <Route path="/prechaves" element={<Pre />} />
        {/* <Route path="/outra" element={<OutraPagina />} />         */}
        </Routes>
  )
      </div>
    </Router>
  );
};

export default App;
