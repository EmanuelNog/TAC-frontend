import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './register_styles.css';


export default function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      password,
      email
    };

    try {
      await api.post('users', data);

      alert(`Voce foi cadastrado, por favor faca seu login.`);

      navigate('/');
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>

          <h1>Cadastro</h1>
          <p> </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Retornar
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Seu Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
