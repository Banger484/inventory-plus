import './AcceptInvite.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { ADD_USER_TO_EXISTING } from '../../utils/mutations';

export default function AcceptInvite () {

    const path = window.location.pathname.split("/")
    const navigate = useNavigate()
    let enterprise = path[path.length - 2]

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
      });
      const [addUser, { error, data }] = useMutation(ADD_USER_TO_EXISTING);
      
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addUser({
            variables: { ...formState, enterprise},
          });
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
        <form  className="loginForm"  onSubmit={handleFormSubmit}>
        <h2>Complete Registration</h2>
            <input                   className="new-user-input formInput-Login" onChange={handleChange} name="name" type="text" placeholder="username"/>
            <input                   className="new-user-input formInput-Login" onChange={handleChange} name="email" type="email" placeholder="email"/>
            <input                   className="new-user-input formInput-Login" onChange={handleChange} name="password" type="password" placeholder="password"/>
            
            <button     id="submitBtn-Login"               className="btn" type="submit">Submit</button>
        </form>
      </div>
      </div>
      </main>

        </div>
    )
}