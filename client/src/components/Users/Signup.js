import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import { FaUserCircle, FaEnvelope, FaLock, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    enterpriseName:'',
    location:''
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
            {data ? (
              <p id="success-Login">
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form  className="signupForm" onSubmit={handleFormSubmit} autocomplete="off" method="post" action="">
              <h4 className="card-header" id="signupHeader">Sign Up</h4>
              <div>
              <FaUserCircle id="usernameIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="usernameInput-Signup"
                  className="formInput-Signup"
                  placeholder="Username"
                  name="name"
                  type="text"
                  autocomplete="off"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>

              <div id="emailForm-Signup">
              <FaEnvelope id="emailIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="emailInput-Signup"
                  className="formInput-Signup"
                  placeholder="Email"
                  name="email"
                  type="email"
                  autocomplete="off"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>

              <div id="passwordForm-Signup">
              <FaLock id="passwordIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="passwordInput-Signup"
                  className="formInput-Signup"
                  placeholder="Password"
                  name="password"
                  type="password"
                  autocomplete="off"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              
              <div id="enterpriseForm-Signup">
                <FaBuilding id="enterpriseIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                  <input id="enterpriseInput-Signup"
                  className="formInput-Signup"
                  placeholder="Enterprise"
                  name="enterpriseName"
                  type="text"
                  autocomplete="off"
                  value={formState.enterpriseName}
                  onChange={handleChange}
                />
              </div>

              <div id="locationForm-Signup">
                <FaMapMarkerAlt id="emailIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="locationInput-Signup"
                  className="formInput-Signup"
                  placeholder="Location"
                  name="location"
                  type="text"
                  autocomplete="off"
                  value={formState.location}
                  onChange={handleChange}
                />
              </div>

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
              <div className="my-3 p-3 bg-danger text-white" id= "errorMsg-Signup">
                {error.message}
              </div>
            )}    </div>
        </div>
      {/* </div> */}
    </main>
  );
};

export default Signup;
