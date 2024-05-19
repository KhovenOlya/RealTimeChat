import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AuthForm from './components/Auth/login';
import ChatForm from './components/Chat/ChatWindow';
import userReducer from './components/Store/userReducer'; // Предполагается, что у вас есть userReducer в вашем хранилище Redux
import chatReducer from './components/Store/chatReducer'; // Предполагается, что у вас есть chatReducer в вашем хранилище Redux

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/chat" element={<ChatForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};


export default App;
