import { useQuery } from "@apollo/client"
import { PRODUCT_ANALYSIS } from "../../utils/queries"
import { t } from "../../utils/translation/translator"
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
    console.log(analysis)
    const analysisArray = []
    for (let key in analysis){
        const subArray = [key,analysis[key]];
        analysisArray.push(subArray)
    }

    if (!analysisArray?.length>0){
        return(
            <h2>No History With this Product</h2>
            )
    }


    return(
        <>
        <table className=".analysis-table product-list-table p-details">
        
        {analysisArray.map((array,index)=>{
            return(<tr>
              <td>{t(array[0])}</td><td>{t(array[1],array[0])}</td>    
          </tr>)
        })}
        </table>
        </>
    )

}