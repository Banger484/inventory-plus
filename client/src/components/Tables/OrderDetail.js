import { TableRow } from "./Row"


export const OrderDetailsTable = ({obj})=>{
    console.log(Object.keys(obj))
    return(
        <table>
            <tbody>

        {Object.keys(obj).map(k=>{
            console.log(k)
            return(<TableRow rowKey={k} values={[obj[k]]}/>)
        })}
        </tbody>
        </table>
    )
}