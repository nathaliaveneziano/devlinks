import { Logo } from '../../components/Logo';
import { useState } from 'react';
import './login.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Preencha todos os campos!');
      return;
    }

    console.log(email);
    console.log(password);
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
