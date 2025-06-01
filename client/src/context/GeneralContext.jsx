// src/context/GeneralContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [usertype, setUsertype] = useState('');
  useEffect(() => {
    const saved = null'userType');
    if (saved) setUsertype(saved);
  }, []); // run once on mount

  // Other states (username/email/password) are only used inside login/register pages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ticketBookingDate, setTicketBookingDate] = useState();

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        { email, password }
      );
      const { userType, userId } = res.data;


      // update React state
      setUsertype(userType);

      // navigate based on userType
      if (userType === 'customer') {
        navigate('/');
      } else if (userType === 'admin') {
        navigate('/admin');
      } else if (userType === 'flight-operator') {
        navigate('/flight-admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // maybe show an error message
    }
  };

  // 3) REGISTER function: similar to login
  const register = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/register`,
        { username, email, password, usertype }
      );
      // backend returns new user info

      // update state
      setUsertype(res.data.usertype);

      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      } else if (res.data.usertype === 'flight-operator') {
        navigate('/flight-admin');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed!!');
    }
  };

  // 4) LOGOUT: clear everything and go to /auth
  const logout = () => {
    setUsertype('');           // reset React state
    navigate('/auth', { replace: true }); // send user to login page
  };

  return (
    <GeneralContext.Provider
      value={{
        usertype,
        setUsertype,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        ticketBookingDate,
        setTicketBookingDate,
        login,
        register,
        logout,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
