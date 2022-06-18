

export const TableRow = ({rowKey,values})=>{
    console.log("key",rowKey)
    console.log("values",values)
    return(
        <tr>
            {rowKey?(
                <td>
                    {rowKey}
                </td>
            ):null}
            {values.map(v=>{
                return(<td>
                    {v}
                </td>)
            })}
        </tr>
    )

}