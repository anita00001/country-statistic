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
        <p>{time}</p>
        <h3>statistics</h3>
        <FaMicrophone />
        <FiSettings />
      </div>
    </>
  );
};

export default NavBar;
