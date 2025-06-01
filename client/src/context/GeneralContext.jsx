import React, { createContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [ticketBookingDate, setTicketBookingDate] = useState();

  const inputs = { username, email, usertype, password };
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const login = async () => {
    try {
      const loginInputs = { email, password };
      const res = await axios.post(`${API_BASE_URL}/login`, loginInputs);

      const { token, userType, user } = res.data;

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);
      localStorage.setItem('userType', userType);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);

      // Navigate based on role
      if (userType === 'customer') {
        navigate('/');
      } else if (userType === 'admin') {
        navigate('/admin');
      } else if (userType === 'flight-operator') {
        navigate('/flight-admin');
      }

      return true;
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed!!");
      return false;
    }
  };

  const register = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, inputs);
      const { token, userType, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);
      localStorage.setItem('userType', userType);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);

      if (userType === 'customer') {
        navigate('/');
      } else if (userType === 'admin') {
        navigate('/admin');
      } else if (userType === 'flight-operator') {
        navigate('/flight-admin');
      }

      return true;
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed!!");
      return false;
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <GeneralContext.Provider value={{
      login,
      register,
      logout,
      username, setUsername,
      email, setEmail,
      password, setPassword,
      usertype, setUsertype,
      ticketBookingDate, setTicketBookingDate
    }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
