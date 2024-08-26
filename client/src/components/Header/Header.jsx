import React, { useContext, useEffect } from 'react';
import style from './Header.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    if (!userInfo) { 
      fetch('http://localhost:3000/profile', {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(userInfo => {
        setUserInfo(userInfo); 
      })
      .catch(error => console.error('Error fetching user info:', error));
    }
  }, [userInfo, setUserInfo]); 

  function handleLogoutOnClick() {
    fetch('http://localhost:3000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
    }).catch(error => console.error('Error logging out:', error));
  }

  const username = userInfo?.username;

  return (
    <header>
      <nav className={style.container}>
        <Link to="/" className={style.logo}>Filipino Food</Link>
        <ul className={style.list}>
          {username ? (
            <>
              <li><Link to="/create">Create new post</Link></li>
              <li><a onClick={handleLogoutOnClick}>{username}</a></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
