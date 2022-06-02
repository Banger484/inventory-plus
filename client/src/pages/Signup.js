import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import { FaUserCircle, FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    enterprise:''
  });
  const [addProfile, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addProfile({
        variables: { ...formState },
      });
      console.log(data)

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="signupCard">
          <h4 className="card-header" id="signupHeader">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} autocomplete="off" method="post" action="">
              <FaUserCircle id="usernameIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="usernameInput-Signup"
                  className="form-input"
                  placeholder="Username"
                  name="name"
                  type="text"
                  autocomplete="off"
                  value={formState.name}
                  onChange={handleChange}
                />
              <FaEnvelope id="emailIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="emailInput-Signup"
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  autocomplete="off"
                  value={formState.email}
                  onChange={handleChange}
                />
              <FaLock id="passwordIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="passwordInput-Signup"
                  className="form-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  autocomplete="off"
                  value={formState.password}
                  onChange={handleChange}
                />
                <FaBuilding id="enterpriseIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                  <input id="enterpriseInput-Signup"
                  className="form-input"
                  placeholder="Enterprise"
                  name="enterprise"
                  type="text"
                  autocomplete="off"
                  value={formState.enterprise}
                  onChange={handleChange}
                />
                <button id="submitBtn-Signup"
                  className="btn"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
