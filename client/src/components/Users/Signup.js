import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER,LOGIN_USER } from '../../utils/mutations';
import auth from '../../utils/auth';
import { FaUserCircle, FaEnvelope, FaLock, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import "./Auth.css"
const Signup = () => {
  console.log(auth)
  const [registered,setRegistered] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    enterpriseName:'',
    location:''
  });
  const [addProfile, { error, data }] = useMutation(ADD_USER);
  const [login,{data:loginData}] = useMutation(LOGIN_USER)

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

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });
      // auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    try{

      const { data:loginData } = await login({
        variables: { email:formState.email,password:formState.password },
      });
      
      auth.login(loginData.login.token);
    }catch(err){
      console.error(err)
    }
  };

  

  return (

    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="signupCard">
            {data ? (
                <Link to="/">
              <div className='success-form'>
                <h2>
                  Success! 
                  </h2>
              <p>
                You are now heading...
              </p><p>

              to the homepage.
              </p>
              </div>
                 </Link>
            ) : (
              <form  className="signupForm" onSubmit={handleFormSubmit} autoComplete="off" method="post" action="">
              <img src='../../images/icons/iplus.png' alt="Inventory+ Logo" className='login-signup-logo' />
              <h4 className="card-header" id="signupHeader">Sign Up</h4>
              <div id="usernameForm-Signup">
              <FaUserCircle id="usernameIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="usernameInput-Signup"
                  className="formInput-Signup"
                  placeholder="Username"
                  name="name"
                  type="text"
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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

                <p className="redirectSignup">
                <Link className='link-text-ls' to="/login">
                  Back to Login
                </Link>
                </p>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white" id= "errorMsg-Signup">
                {error.message}
              </div>
            )}
          </div>
        </div>
    </main>
  );
};

export default Signup;
