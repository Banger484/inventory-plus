import { t } from "../../utils/translation/translator";

export const Table = ({data,excludedProperties=[]})=>{
    console.log("this is the table data",data)

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
    console.log(trimmedData)

    const headings = [];
    for (let d in trimmedData[0]){
        headings.push(d)
    }
    console.log("headings",headings)
    
    return(
        <table className="product-list-table">
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
                    console.log(Object.keys(i))
                    return(
                        <tr>
                            {Object.keys(i).map((p)=>{
                                return(
                                    <td>{typeof i[p]==="number"?Math.round(i[p]):i[p]}</td>
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