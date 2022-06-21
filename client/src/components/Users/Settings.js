import { themes } from "../../themes"


export const Settings = ({handleThemeChange})=>{
    return (
        <div>
            <select onChange={handleThemeChange}>
                {Object.keys(themes).map(k=>{
                    return(<option value={k}>{k}</option>)
                })}
                </select>
        </div>
    )
}