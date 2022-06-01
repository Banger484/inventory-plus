import { useQuery,useMutation } from '@apollo/client';
import React, { useRef } from 'react';
import auth from '../../utils/auth'
import {QUERY_ENT_USERS} from "../../utils/queries"
import { REMOVE_USER } from '../../utils/mutations';

export default function Roster () {
    const user = auth.getProfile()
    console.log(user.data.enterprise)
    const {loading,data}=useQuery(QUERY_ENT_USERS,{
        variables:{ enterpriseId: user.data.enterprise}
    })
    const [removeUser, { error, deletedData }] = useMutation(REMOVE_USER);
    const users = data?.getEnterpriseUsers

    const handleRemoveUser = async (id)=>{
        try{

            const {data} = await removeUser({
                variables:{userId:id}
            })
        }catch(err){
            console.log(err)
        }
    }
    console.log(users)
    return (
        <div>
            <h1>Employee Roster</h1>
            {!loading?users.map(u=>{
                return(<div><h2>{u.name}</h2><button onClick={()=>handleRemoveUser(u._id)}>Remove</button></div>)
            }):null}
        </div>
    )
}