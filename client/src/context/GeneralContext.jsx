import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState(localStorage.getItem('userType') || '');

  const [ticketBookingDate, setTicketBookingDate] = useState();

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, { email, password });
      const { userType, userId } = res.data;
      localStorage.setItem('userType', userType);
      localStorage.setItem('userId', userId);
      setUsertype(userType); // update React state!

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
    }
  };

  const register = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`, { username, email, password, usertype });
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      setUsertype(res.data.usertype); // update React state!

      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      } else if (res.data.usertype === 'flight-operator') {
        navigate('/flight-admin');
      }
    } catch (err) {
      alert("Registration failed!!");
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUsertype('');
    navigate('/auth'); // navigate to login page on logout
  };

  return (
    <GeneralContext.Provider
      value={{
        login,
        register,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype,
        ticketBookingDate,
        setTicketBookingDate,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
