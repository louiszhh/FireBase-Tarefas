
import React, { useState } from 'react';
import { auth } from '../firebaseConnect';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import './Auth.css';

const Auth = ({ onUserLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function novoUsuario() {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setEmail("");
      setSenha("");
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        alert("Senha muito fraca.");
      } else if (error.code === 'auth/email-already-in-use') {
        alert("Esse email já está em uso.");
      }
    }
  }

  async function logarUsuario() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      onUserLogin(userCredential.user);
      setEmail("");
      setSenha("");
    } catch (error) {
      console.log("ERRO " + error);
    }
  }

  return (
    <div className="auth-container">
      <h2>Usuários</h2>
      <label>Email:</label>
      <input
        placeholder="Insira um email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label>Senha:</label>
      <input
        placeholder="Insira uma senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={novoUsuario}>Cadastrar</button>
      <button onClick={logarUsuario}>Login</button>
    </div>
  );
};

export default Auth;
