
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConnect';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc,
  query,
} from 'firebase/firestore';
import './Tasks.css';

const Tasks = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const carregarTarefas = () => {
      const q = query(collection(db, "tasks"));
      onSnapshot(q, (snapshot) => {
        const listaTarefas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTarefas(listaTarefas);
      });
    };
    carregarTarefas();
  }, []);

  async function adicionarTarefa() {
    try {
      await addDoc(collection(db, "tasks"), {
        titulo: titulo,
        descricao: descricao,
      });
      setTitulo("");
      setDescricao("");
    } catch (error) {
      console.log("Erro ao adicionar tarefa: ", error);
    }
  }

  async function editarTarefa() {
    if (!tarefaSelecionada) return;
    try {
      const tarefaDoc = doc(db, "tasks", tarefaSelecionada.id);
      await updateDoc(tarefaDoc, {
        titulo: titulo,
        descricao: descricao,
      });
      setTitulo("");
      setDescricao("");
      setTarefaSelecionada(null);
    } catch (error) {
      console.log("Erro ao editar tarefa: ", error);
    }
  }

  async function excluirTarefa(tarefa) {
    try {
      const tarefaDoc = doc(db, "tasks", tarefa.id);
      await deleteDoc(tarefaDoc);
    } catch (error) {
      console.log("Erro ao excluir tarefa: ", error);
    }
  }

  function selecionarTarefa(tarefa) {
    setTarefaSelecionada(tarefa);
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
  }

  return (
    <div className="tasks-container">
      <h2>Tarefas</h2>
      <label>Título:</label>
      <input
        placeholder="Insira o título da tarefa"
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <br />
      <label>Descrição:</label>
      <input
        placeholder="Insira a descrição da tarefa"
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button onClick={tarefaSelecionada ? editarTarefa : adicionarTarefa}>
        {tarefaSelecionada ? "Editar Tarefa" : "Adicionar Tarefa"}
      </button>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <div className="tarefa-detalhes">
              <strong className="tarefa-titulo">{tarefa.titulo}</strong>
              <p className="tarefa-descricao">{tarefa.descricao}</p>
            </div>
            <div className="tarefa-acoes">
              <button onClick={() => selecionarTarefa(tarefa)}>Editar</button>
              <button onClick={() => excluirTarefa(tarefa)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
