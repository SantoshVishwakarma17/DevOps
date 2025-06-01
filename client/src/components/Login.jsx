import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLogin}) => {

  const { setEmail, setPassword, login } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  const success = await login();

  if (success) {
    setIsLoggedin(true);  // **Notify app that user logged in**

    const userType = localStorage.getItem('userType');
    if (userType === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  } else {
    alert('Login failed, please check your credentials.');
  }
}

  return (
    <form className="authForm">
        <h2>Login</h2>
        <div className="form-floating mb-3 authFormInputs">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                                                                  onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Email address</label>
        </div>
            <div className="form-floating mb-3 authFormInputs">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" 
                                                                  onChange={(e) => setPassword(e.target.value)} /> 
            <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>Sign in</button>

        <p>Not registered? <span onClick={()=> setIsLogin(false)}>Register</span></p>
    </form>
  )
}

export default Login;
