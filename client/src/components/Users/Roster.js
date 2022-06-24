// Imports custom css file and requires all dependant files
import { useQuery, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import auth from "../../utils/auth";
import "./Roster.css";
import { REMOVE_USER } from "../../utils/mutations";

//exports function to render employee roster
export default function Roster({ roster, rosterRefetch }) {
  const [userList, setUserList] = useState(roster);
  const [removeUser, { error }] = useMutation(REMOVE_USER);

  // function to remove user from enterprise roster
  const handleRemoveUser = async (id) => {
    try {
      const { data } = await removeUser({
        variables: { userId: id },
      });
      const newList = userList.filter((user) => {
        return user._id !== id;
      });
      setUserList(newList);
      rosterRefetch();
    } catch (err) {
      console.error(err);
    }
  }


    return (
      //HTML for employee roster
        <div className='employee-roster-cont'>
          <div className="table-top rec-order-tt">
            <h1>Employee Roster</h1>
          </div>

            {userList.map((u,i)=>{
                return(<div className='employee-cont' key={i}><h3>{u.name}</h3><h3>{u.email}</h3><button onClick={()=>handleRemoveUser(u._id)}>Remove</button></div>)
            })}
        </div>
    )
}

