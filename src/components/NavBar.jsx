import { useEffect, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import '../styles/NavBar.css';

const NavBar = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="nav-bar-wrapper">
        <p data-testid="time-element">{time}</p>
        <h3>statistics</h3>
        <FaMicrophone data-testid="microphone-icon" />
        <FiSettings data-testid="setting-icon" />
      </div>
    </>
  );
};

export default NavBar;
