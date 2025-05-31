import React, { createContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [ticketBookingDate, setTicketBookingDate] = useState();

  const inputs = {username, email, usertype, password};

  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL;
  console.log("API Base URL:", API_BASE_URL);

  const login = async () =>{
    try{
      const loginInputs = {email, password};
      console.log("Logging in with:", loginInputs);
      const res = await axios.post(`${API_BASE_URL}/login`, loginInputs);
      console.log("Login response:", res.data);

      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if(res.data.usertype === 'customer'){
          navigate('/');
      } else if(res.data.usertype === 'admin'){
          navigate('/admin');
      } else if(res.data.usertype === 'flight-operator'){
        navigate('/flight-admin');
      }

    }catch(err){
      alert("Login failed!!");
      console.error("Login error:", err);
    }
  }

  const register = async () =>{
    try{
      console.log("Registering user with inputs:", inputs);
      const res = await axios.post(`${API_BASE_URL}/register`, inputs);
      console.log("Register response:", res.data);

      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if(res.data.usertype === 'customer'){
          navigate('/');
      } else if(res.data.usertype === 'admin'){
          navigate('/admin');
      } else if(res.data.usertype === 'flight-operator'){
        navigate('/flight-admin');
      }

    }catch(err){
      alert("Registration failed!!");
      console.error("Registration error:", err);
    }
  }

  const logout = () =>{
    localStorage.clear();
    navigate('/');
  }

  return (
    <GeneralContext.Provider value={{
      login, register, logout, 
      username, setUsername, 
      email, setEmail, 
      password, setPassword, 
      usertype, setUsertype, 
      ticketBookingDate, setTicketBookingDate
    }}>
      {children}
    </GeneralContext.Provider>
  )
}

export default GeneralContextProvider;
