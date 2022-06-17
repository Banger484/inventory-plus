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
        <h1>Complete Registration</h1>

        <form onSubmit={handleFormSubmit}>
            <input onChange={handleChange} name="name" type="text" placeholder="username"/>
            <input onChange={handleChange} name="email" type="email" placeholder="email"/>
            <input onChange={handleChange} name="password" type="password" placeholder="password"/>
            
            <button type="submit">Submit Registration</button>
        </form>
        </div>
    )
}