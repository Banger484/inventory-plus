import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import auth from '../../utils/auth';
import { FaUserCircle, FaEnvelope, FaLock, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("Username is required!"),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(28).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  enterpriseName: yup.string().required("Enterprise is required!"),
  location: yup.string().required(),
});

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    enterpriseName:'',
    location:''
  });
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(userSchema)
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
  const handleFormSubmit = async (d) => {
    const variables = {
      name: d.name,
      email: d.email,
      password: d.password,
      enterpriseName: d.enterpriseName,
      location: d.location
    }

    try {
      const { data } = await addProfile({
        variables
      });
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
              <form  className="signupForm" onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off" method="post" action="">
              <img src='../../images/icons/iplus.png' alt="Inventory+ Logo" className='login-signup-logo' />
              <h4 className="card-header" id="signupHeader">Sign Up</h4>
              <div id="usernameForm-Signup">
              <FaUserCircle id="usernameIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="usernameInput-Signup"
                  className="formInput-Signup"
                  placeholder="Username"
                  name="name"
                  type="text"
                  {...register("name")}
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
                  {...register("email")}
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
                  {...register("password")}
                  autoComplete="off"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>

              <div id="passwordForm-Signup">
              <FaLock id="passwordIcon-Signup" style={{color: 'gray', fontSize: '25px'}} />
                <input id="confirmPasswordInput-Signup"
                  className="formInput-Signup"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  autoComplete="off"
                  value={formState.confirmPassword}
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
                  {...register("enterpriseName")}
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
                  {...register("location")}
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
                <div>{errors.name?.message} 
              {errors.email?.message} 
              {errors.password?.message} 
              {errors.confirmPassword && "Passwords Should Match!"} 
              {errors.enterpriseName?.message} 
              {errors.location?.message}</div>
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
