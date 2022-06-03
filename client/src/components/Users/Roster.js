import { useQuery,useMutation } from '@apollo/client';
import React, { useRef,useState } from 'react';
import auth from '../../utils/auth'
import "./Roster.css"

import { REMOVE_USER } from '../../utils/mutations';

export default function Roster ({roster}) {

    const [userList,setUserList] = useState(roster)
    const [removeUser,{error}] = useMutation(REMOVE_USER)

    const handleRemoveUser = async (id)=>{
        try{
            console.log("in function")
            const {data} = await removeUser({
                variables:{userId:id}
            })
            const newList = userList.filter(user=>{
                return user._id!==id
            });
            setUserList(newList)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='employee-roster-cont'>
            <h1>Employee Roster</h1>
            {userList.map((u,i)=>{
                return(<div className='employee-cont' key={i}><h3>{u.name}</h3><h3>{u.email}</h3><button onClick={()=>handleRemoveUser(u._id)}>Remove</button></div>)
            })}
        </div>
    )
}