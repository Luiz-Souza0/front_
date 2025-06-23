// src/components/Parc.js
import React, { useState, useEffect } from 'react';
import api from '../../API/api';
import './Parcelas.css';

const Parc = () => {
  const [dados, setDados] = useState([]);
  const [competencia, setCompetencia] = useState('');
  const [valor, setValor] = useState('');
  const [checked, setChecked] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [anoSelecionado, setAnoSelecionado] = useState('todos');

  useEffect(() => {
    api
      .get('/Parcelas')
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados:', error);
      });
  }, []);

  const formatarValor = (valor) => {
    const num = valor.replace(/\D/g, '');
    if (!num) return '';
    const inteiro = num.slice(0, -2) || '0';
    const decimal = num.slice(-2);
    return `${parseInt(inteiro, 10)},${decimal.padEnd(2, '0')}`;
  };

  const formatarCompetencia = (valor) => {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 2) {
      valor = valor.slice(0, 2) + '-' + valor.slice(2, 6);
    }
    return valor.slice(0, 7);
  };

  const adicionarLinha = () => {
    if (!competencia || !valor) {
      alert('Preencha competência e valor.');
      return;
    }

    const novaLinha = {
      competencia,
      valor,
      checked,
      guardado,
    };

    api
      .post('/Parcelas', novaLinha)
      .then((response) => {
        setDados([...dados, response.data]);
        setCompetencia('');
        setValor('');
        setChecked(false);
        setGuardado(false);
      })
      .catch((error) => {
        console.error('Erro ao adicionar dados:', error);
      });
  };

  const handleValorChange = (e) => {
    setValor(formatarValor(e.target.value));
  };

  const handleCompetenciaChange = (e) => {
    setCompetencia(formatarCompetencia(e.target.value));
  };

  const obterAnosUnicos = () => {
    const anos = dados
      .map((item) => item.competencia.split('-')[1])
      .filter((ano) => !!ano);
    return [...new Set(anos)];
  };

  const deletarLinha = (competencia) => {
    api
      .delete(`/Parcelas/${competencia}`)
      .then(() => {
        setDados(dados.filter((item) => item.competencia !== competencia));
      })
      .catch((error) => {
        console.error('Erro ao deletar dado:', error);
      });
  };

  const handleCheckboxChange = (index) => {
    const novosDados = [...dados];
    novosDados[index].checked = !novosDados[index].checked;
    setDados(novosDados);

    api
      .put(`/Parcelas/${novosDados[index].competencia}`, {
        checked: novosDados[index].checked,
      })
      .catch((error) => {
        console.error('Erro ao atualizar o checkbox:', error);
      });
  };

  const handleGuardadoChange = (index) => {
    const novosDados = [...dados];
    novosDados[index].guardado = !novosDados[index].guardado;
    setDados(novosDados);

    api
      .put(`/Parcelas/${novosDados[index].competencia}`, {
        guardado: novosDados[index].guardado,
      })
      .catch((error) => {
        console.error('Erro ao atualizar o checkbox de guardado:', error);
      });
  };

  return (
    <div className="container">
      <h2 style={{ color: 'gray' }}>Tabela de Valores das parcelas</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Competência (MM/AAAA)"
          value={competencia}
          onChange={handleCompetenciaChange}
        />
        <input
          type="text"
          placeholder="Valor (00,00)"
          value={valor}
          onChange={handleValorChange}
          maxLength={10}
        />
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          Marcar
        </label>
        <label>
          <input
            type="checkbox"
            checked={guardado}
            onChange={() => setGuardado(!guardado)}
          />
          Guardado?
        </label>
        <button onClick={adicionarLinha}>Adicionar</button>
      </div>

      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
        <label style={{ marginRight: '8px' }}>Filtrar por ano:</label>
        <select
          value={anoSelecionado}
          onChange={(e) => setAnoSelecionado(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="nenhum">Nenhum</option>
          {obterAnosUnicos().map((ano, idx) => (
            <option key={idx} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Competência</th>
            <th>Valor</th>
            <th>Pago?</th>
            <th>Guardado?</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {dados
            .filter((item) => {
              if (anoSelecionado === 'todos') return true;
              if (anoSelecionado === 'nenhum') return false;
              const ano = item.competencia.split('-')[1];
              return ano === anoSelecionado;
            })
            .map((item, index) => (
              <tr key={index}>
                <td>{item.competencia.replace('-', '/')}</td>
                <td>{item.valor}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.guardado || false}
                    onChange={() => handleGuardadoChange(index)}
                  />
                </td>
                <td>
                  <button
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => deletarLinha(item.competencia)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Parc;
