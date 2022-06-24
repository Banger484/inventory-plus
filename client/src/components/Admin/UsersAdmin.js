import { QUERY_USERS } from "../../utils/queries"
import { useMutation, useQuery } from "@apollo/client"
import { TOGGLE_USER } from "../../utils/mutations"
import { Link } from "react-router-dom"
import { Logout } from "../Users/logout"

export const UsersAdmin = ()=>{

    const {data,loading,error,refetch} = useQuery(QUERY_USERS)
    const [toggleUser,{data:toggleData,loading:toggleLoading,error:toggleError}] = useMutation(TOGGLE_USER)
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    const handleDisableUser = async (e)=>{
        const id = e.target.dataset.id;
        await toggleUser({variables:{toggleUserId:id}})
        refetch()
    }

    return (
        <div>
                        <Link className='task-links' to="/">
                            <div>Back</div>
                        </Link>
            <h2>
                Users
                </h2>
                <Logout/>
                <table  className="product-list-table">
                    <tbody>

                {data.getAllUsers.map(u=>{
                    return(
                        <tr>
                            <td>
                                {u._id}
                            </td>
                            <td>
                                {u.name}
                            </td>
                            <td>
                                {u.email}
                            </td>
                            <td>
                                <button data-id={u._id} onClick={handleDisableUser}>
                                    {u.disabled?"Disabled":"Enabled"}
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
        </div>
    )
}