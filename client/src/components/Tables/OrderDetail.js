import { TableRow } from "./Row"


export const OrderDetailsTable = ({obj})=>{
    return(
        <table>
            <tbody>

        {Object.keys(obj).map(k=>{
            return(<TableRow rowKey={k} values={[obj[k]]}/>)
        })}
        </tbody>
        </table>
    )
}