import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

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
          <h4 className="card-header" id="loginHeader">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} autocomplete="off" method="post" action="">
                <input id="emailInput-Login"
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  autocomplete="off"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input id="passwordInput-Login"
                  className="form-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  autocomplete="off"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button id="submitBtn-Login"
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              {error && (
              <div className="my-3 p-3 bg-danger text-white" id= "errorMsg">
                {error.message}
              </div>
              )}
            </form>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
