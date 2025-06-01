import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLogin, setIsLoggedin }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await login(); // login() handles the request and localStorage

    if (success !== false) {
      setIsLoggedin(true); // Notify app that user logged in

      const userType = localStorage.getItem('userType');
      if (userType === 'admin') {
        navigate('/admin');
      } else if (userType === 'flight-operator') {
        navigate('/flight-admin');
      } else {
        navigate('/');
      }
    } else {
      alert('Login failed, please check your credentials.');
    }
  };

  return (
    <form className="authForm" onSubmit={handleLogin}>
      <h2>Login</h2>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button type="submit" className="btn btn-primary">Sign in</button>

      <p>
        Not registered?{" "}
        <span onClick={() => setIsLogin(false)} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
          Register
        </span>
      </p>
    </form>
  );
};

export default Login;
