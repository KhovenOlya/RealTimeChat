//login
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './styles.module.css';
import logo from './logo.png'; 

const AuthForm: React.FC = () => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    localStorage.setItem('username', username);
    window.location.href = '/chat';
  };

  return (
    <div>
    <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
    </div>
      <div className={styles.titleContainer}>
        <h1 />Для тех,<br />
        кто всегда онлайн<h1 />
      </div>
      <div className={`${styles.container} ${styles.login}`}>
        <h1>Авторизация</h1>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          placeholder="Имя пользователя"
          className={styles.input} 
          InputProps={{
            classes: {
              notchedOutline: styles.noBorder, 
            },
          }}
        />
        <Button onClick={handleLogin} variant="contained" color="primary" className={styles.button}> 
          Войти
        </Button>
      </div>
    </div>
  );
  
};
export default AuthForm
