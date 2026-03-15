import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SessionTimeout = ({ timeout = 15 * 60 * 1000 }) => { // Default 15 minutes
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      toast('Session timed out due to inactivity.', { icon: '⏰' });
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(handleLogout, timeout);
    };

    // Events that reset the timer
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timer) clearTimeout(timer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [handleLogout, timeout]);

  return null; // This component doesn't render anything
};

export default SessionTimeout;
