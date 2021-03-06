import { t } from "../../utils/translation/translator";

export const Table = ({data,excludedProperties=[]})=>{


    const trimmedData = []

    for(let row of data){
        const obj = {};
        for (let key in row){
            if(!excludedProperties.includes(key)){
                obj[key]=row[key]
            }
        }
        trimmedData.push(obj)
    }


    const headings = [];
    for (let d in trimmedData[0]){
        headings.push(d)
    }

    
    return(
        <table className="product-list-table analysis-table">
            <thead>

            <tr>
                {headings.map(h=>(
                    <th>{t(h)}</th>
                    ))}
            </tr>
                    </thead>
                    <tbody>

            {
                trimmedData.map((i)=>{
                    return(
                        <tr>
                            {Object.keys(i).map((p)=>{
                                return(
                                    // <td>{typeof i[p]==="number"?Math.round(i[p]):i[p]}</td>
                                    <td>{t(i[p],p)}</td>
                                )
                            })}
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}