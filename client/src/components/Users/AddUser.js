import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Auth from '../../utils/auth';
import "./AddUser.css"

export default function AddUser () {
    const form = useRef();

    const enterprise = Auth.getProfile().data.enterprise

    // const link = `http://localhost:3000/invite/${enterprise}`
    const link = `https://inventoryplus.herokuapp.com/invite/${enterprise}/`
    
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ikwf2if', 'template_op0417e', form.current, 'LXAuyeYFRIN_Vzkeh')
        .then((result) => {
        }, (error) => {
        });
        e.target.reset();
    }
    return (
        <div className='add-user-section'>
            <div className='table-top rec-order-tt'>
            <h1>Invite User</h1>

            </div>
            <form ref={form} onSubmit= {sendEmail}>
                <input name="user_email" type="email" placeholder="Email Address..."></input>
                <input name="enterpriseId" type="hidden" value={link}></input>
                <button id= "addUserButton"type='submit' value="Send">Send Invite</button>
            </form>
        </div>
    )
}