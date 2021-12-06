import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './LoginFormModal.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoLogin = (e) => {
    e.preventDefault();
    const demoCredential ='Demo-lition';
    const demoPassword = 'password';
    setErrors([]);
    return dispatch(sessionActions.demoLogin({ demoCredential, demoPassword })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

  return (
    <form id='login-form' onSubmit={handleSubmit}>
      <img id='login-logo' src='https://res.cloudinary.com/dd1ndszow/image/upload/v1638735300/Logo_eu5sbs.png' alt='roasted logo' />
      <div className='login-text' id='roasted-name'>Roasted</div>
      <p className='login-text' id='roasted-tagline'>Cozy Up With Friends</p>
      <div className='login-input'>
        <label>
          Username or Email
        </label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </div>
      <div className='login-input'>
        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='login-button-container'>
        <button className='login-button' id='login' type="submit">Log In</button>
        <button className='login-button' id='demo' onClick={demoLogin}>Demo</button>
      </div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
    </form>
  );
}

export default LoginForm;
