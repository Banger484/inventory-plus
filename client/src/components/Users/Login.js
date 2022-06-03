import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import { FaEnvelope, FaLock } from "react-icons/fa";

import Auth from '../../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (

    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="loginCard">
            {data ? (
              <p id="success-Login">
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="loginForm" onSubmit={handleFormSubmit} autoComplete="off" method="post" action="">
              <img src='../../images/icons/iplus.png' alt="Inventory+ Logo" className='login-signup-logo' />
              <h4 className="card-header" id="loginHeader">Login</h4>
              <div id="emailForm-Login">
              <FaEnvelope id="emailIcon-Login" style={{color: 'gray', fontSize: '25px'}} />
                <input id="emailInput-Login"
                  className="formInput-Login"
                  placeholder="Email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>

              <div id="passwordForm-Login">
              <FaLock id="passwordIcon-Login" style={{color: 'gray', fontSize: '25px'}} />
                <input id="passwordInput-Login"
                  className="formInput-Login"
                  placeholder="Password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>

                <button id="submitBtn-Login"
                  className="btn"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>

                <p className="redirectSignup">
                <Link className='link-text-ls' to="/signup">
                  Create an Account
                </Link>
                </p>

              {error && (
              <div className="my-3 p-3 bg-danger text-white" id= "errorMsg-Login">
                {error.message}
              </div>
              )}
            </form>
            )}
          </div>
        </div>
    </main>
  );
};

export default Login;
