import { useQuery } from "@apollo/client"
import { PRODUCT_ANALYSIS } from "../../utils/queries"

export default function ProductDetails ({enterpriseId,productId}){

    console.log(productId)
    const{loading:analysisLoading,data:analysisData} = useQuery(
        PRODUCT_ANALYSIS,{
            variables:{enterpriseId:enterpriseId,productId:productId}
        }
    )

    if(analysisLoading){
        return(
            <h3>Loading...</h3>
        )
    }
    console.log(analysisData)
    const analysis = analysisData.generateProductReport
    console.log(analysis)
    const analysisArray = []
    for (let key in analysis){
        const subArray = [key,analysis[key]];
        analysisArray.push(subArray)
    }
    return(
        <>
        <table className="product-list-table p-details">

        {analysisArray.map((array,index)=>{
            return(<tr>
              <td>{array[0]}</td><td>{array[1]}</td>    
          </tr>)
        })}
        </table>
        </>
    )

}