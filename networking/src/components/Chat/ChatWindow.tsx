import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Header from './Header';
import styles from './chatWindowStyles.module.css';

const ChatForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUserMessage: boolean }[]>([]);
  const [wsService, setWsService] = useState<WebSocket | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      const newWsService = new WebSocket('ws://localhost:8080');
      newWsService.onopen = () => {
        console.log('WebSocket connection established');
      };
      newWsService.onmessage = (event) => {
        const receivedMessage = event.data;
        setMessages((prevMessages) => [...prevMessages, { text: receivedMessage, isUserMessage: false }]);
      };
      newWsService.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      newWsService.onclose = () => {
        console.log('WebSocket connection closed');
      };
      setWsService(newWsService);
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  const sendMessage = () => {
    if (wsService && wsService.readyState === WebSocket.OPEN) {
      wsService.send(message);
      setMessages([...messages, { text: message, isUserMessage: true }]);
      setMessage('');
    }
  };

  return (
    <div>
      <Header username={username} onLogout={handleLogout} />
      <div className={styles.container}>
        {messages.map((msg, index) => (
          <div className={msg.isUserMessage ? styles.messageContainer : styles.otherMessageContainer} key={index}>
            <Typography
              variant="body1"
              className={msg.isUserMessage ? styles.userMessage : styles.otherMessage}
            >
              {msg.text}
            </Typography>
          </div>
        ))}
        <div className={styles.inputContainer}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            placeholder="Сообщение"
            className={styles.input}
            InputProps={{
              classes: {
                notchedOutline: styles.noBorder,
              },
              style: {
                borderRadius: 30,
              }
            }}
            fullWidth
          />
          <Button onClick={sendMessage} variant="contained" color="primary" className={styles.button}>
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
