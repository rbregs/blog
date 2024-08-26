import React, { useContext, useState } from 'react';
import style from './Login.module.css';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); // Initialize with false for clarity
  const { setUserInfo } = useContext(UserContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setRedirect(true); 
      } else {
        alert('Wrong credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={onLogin}>
        <span>Login</span>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
