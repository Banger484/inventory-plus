import { themes } from "../../themes"


export const Settings = ({handleThemeChange})=>{
    return (
        <div className="settings-menu">
            <select onChange={handleThemeChange}>
                {Object.keys(themes).map(k=>{
                    return(<option value={k}>{k}</option>)
                })}
                </select>
        </div>
    )
}