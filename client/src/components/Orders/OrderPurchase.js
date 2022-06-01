import { useQuery } from "@apollo/client"
import auth from '../../utils/auth'
import { GET_CURRENT_STOCKS } from "../../utils/queries";
import { getStocksByGroup, groupItems } from "../../utils/remodeledData";

export default function OrderPurchase () {
    const user = auth.getProfile();
    const { loading, data } = useQuery(GET_CURRENT_STOCKS, {
        variables: { enterpriseId: user.data.enterprise}
    })
    let groups
    if(!loading){
        console.log(data);
        groups = groupItems(data.getCurrentStocks)
        console.log(groups)
    }
    return (
        <div>
            <h1>OrderPurchase</h1>
        </div>
    )
}