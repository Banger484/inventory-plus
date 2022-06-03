import { useQuery } from "@apollo/client"
import { PRODUCT_ANALYSIS } from "../../utils/queries"

export default function ProductDetails ({enterpriseId,productId}){

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
    const analysis = analysisData.generateProductReport
    const analysisArray = []
    for (let key in analysis){
        const subArray = [key,analysis[key]];
        analysisArray.push(subArray)
    }
    return(
        <>
        <table className="product-list-table">

        {analysisArray.map((array,index)=>{
            return(<tr>
              <td>{array[0]}</td><td>{array[1]}</td>    
          </tr>)
        })}
        </table>
        <h1>Loaded</h1>
        </>
    )

}