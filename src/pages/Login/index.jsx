import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Logo } from '../../components/Logo';
import { auth } from '../../services/firebaseConnection';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Preencha todos os campos!');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('usuario logado com sucesso');
        navigate('/admin', { replace: true });
      })
      .catch(() => {
        console.log('erro de login');
      });
  }

  return (
    <div className="login">
      <Logo />
      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="********"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Acessar</button>
      </form>
    </div>
  );
}
