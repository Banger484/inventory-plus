import './AcceptInvite.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { ADD_USER_TO_EXISTING } from '../../utils/mutations';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const addUserSchema = yup.object().shape({
  name: yup.string().required("Username is required!"),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(28).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

export default function AcceptInvite() {

  const path = window.location.pathname.split("/")
  const navigate = useNavigate()
  let enterprise = path[path.length - 1]
  console.log(enterprise);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(addUserSchema)
  });
  const [addUser, { error, data }] = useMutation(ADD_USER_TO_EXISTING);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };


  const handleFormSubmit = async (d) => {
    try {
      const variables = { name: d.name,
        email: d.email,
        password: d.password,
        enterprise: enterprise}
      console.log(variables);
      const { data } = await addUser({
        variables}
        
      );
    } catch (e) {
      console.error(e);
    }
    navigate('/login')
  };
  return (
    <div className="accept-invite-body">
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="loginCard">
            <form className="loginForm acceptForm" onSubmit={handleSubmit(handleFormSubmit)}>
              <h2>Complete Registration</h2>
              <input className="new-user-input formInput-Login" onChange={handleChange} name="name" type="text" placeholder="username" {...register("name")} />
              <input className="new-user-input formInput-Login" onChange={handleChange} name="email" type="email" placeholder="email" {...register("email")} />
              <input className="new-user-input formInput-Login" onChange={handleChange} name="password" type="password" placeholder="password" {...register("password")}/>
              <input className="new-user-input formInput-Login" onChange={handleChange} name="confirmPassword" type="password" placeholder="confirm password" {...register("confirmPassword")}/>
              <button id="submitBtn-Login" className="btn" type="submit">Submit</button>
              <div>{errors.name?.message} 
              {errors.email?.message} 
              {errors.password?.message} 
              {errors.confirmPassword && "Passwords Should Match!"}
              </div>
            </form>
          </div>
        </div>
      </main>

    </div>
  )
}