import { Link } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import { QUERY_ALL_PRODUCTS } from "../../utils/queries"
import { TOGGLE_PRODUCT } from "../../utils/mutations"
import { Logout } from "../Users/logout"



export const ProductAdmin = ()=>{

    const {data,loading,error,refetch} = useQuery(QUERY_ALL_PRODUCTS,{variables:{all:true}})
    const [toggleProduct,{}] = useMutation(TOGGLE_PRODUCT)
    const handleDisableProduct = async (e)=>{
        const id = e.target.dataset.id;
        await toggleProduct({variables:{toggleProductId:id}})
        refetch()
    }

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    console.log(data)

    return(
        <div>
                                    <Link className='task-links' to="/">
                            <div>Back</div>
                        </Link>
                        <Logout/>
            ProductAdmin
            <table  className="product-list-table">
                    <tbody>
            {data.allProducts.map(u=>{
                    return(
                        <tr>
                            <td>
                                {u._id}
                            </td>
                            <td>
                                {u.name}
                            </td>
                            <td>
                                {u.sku}
                            </td>
                            <td>
                                <button data-id={u._id} onClick={handleDisableProduct}>
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