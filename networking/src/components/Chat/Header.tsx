import React from 'react';
import './styles.css';
interface HeaderProps {
  username: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <div className="header-container">
      <div>{username}</div>
      <button onClick={onLogout} className="logout-button">Выйти</button>
    </div>
  );
};

export default Header;
