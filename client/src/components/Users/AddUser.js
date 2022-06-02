import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Auth from '../../utils/auth';

export default function AddUser () {
    const form = useRef();

    const enterprise = Auth.getProfile().data.enterprise

    const link = `http://localhost:3000/invite/${enterprise}`
    
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ikwf2if', 'template_op0417e', form.current, 'LXAuyeYFRIN_Vzkeh')
        // console.log(enterprise)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    }
    return (
        <div>
            <h1>Invite User</h1>
            <form ref={form} onSubmit= {sendEmail}>
                <input name="user_email" type="email"></input>
                <input name="enterpriseId" type="hidden" value={link}></input>
                <button type='submit' value="Send">Send Invite</button>
            </form>
        </div>
    )
}