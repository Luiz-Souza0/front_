import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pos from './components/PosChaves';
import Pre from './components/PreChaves';
import Header from './components/Header';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <h1>Bem-vindo ao Nosso Sistema de Organização de Parcelas</h1>
        <Routes>
        <Route path="/poschaves" element={<Pos />} />
        <Route path="/prechaves" element={<Pre />} />
        {/* <Route path="/outra" element={<OutraPagina />} />         */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
