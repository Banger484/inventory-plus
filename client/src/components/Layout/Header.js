import './Header.css'
import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ENTERPRISE_BY_ID} from '../../utils/queries'
import auth from '../../utils/auth'




export default function Header () {

    const user = auth.getProfile()

    const { loading, data } = useQuery(GET_ENTERPRISE_BY_ID, {
    variables: { id: user.data.enterprise}
    })

    console.log(data);

    const enterpriseName = data.getEnterpriseById.name
    const name = user.data.name

    return (
        <header>
            {loading ? (
            <div>Loading...</div>
          ) : (
        <>
            <div className='header-enterprise'>
            <h1>{ enterpriseName }</h1>
            <p>Welcome, {name}.</p>
            </div>
            <div className='header-logo'>
            <img src='/images/icons/iplus.png' alt="Inventory+ Logo" />
            </div> 
        </>
             
          )} 
        </header>
    )
}