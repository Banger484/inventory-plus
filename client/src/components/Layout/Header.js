import './Header.css'
import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ENTERPRISE_BY_ID} from '../../utils/queries'
import auth from '../../utils/auth'




export default function Header (props) {

    

    return (
        <header>
          <div className='header-enterprise'>
            <h1>{ props.enterprise }</h1>
            <p>Welcome, {props.user}.</p>
          </div>
          <div className='header-logo'>
            <img src='/images/icons/iplus.png' alt="Inventory+ Logo" />
          </div> 
        </header>
    )
}