import { themes } from "../../themes"
import { useMutation } from "@apollo/client"
import { SET_THEME } from "../../utils/mutations"


export const Settings = ({handleThemeChange,user})=>{


const [setTheme,{data:setThemeData,error:setThemeError}] = useMutation(SET_THEME)


const handleThemeChangeAndSetThemeForUser = async (e)=>{
    handleThemeChange(e)
    const variables = {userId:user.data._id,theme:e.target.value};
    console.log(variables)
    const resp = await setTheme({variables})
    console.log(resp)
}

    return (
        <div className="settings-menu">
            <select onChange={handleThemeChangeAndSetThemeForUser}>
                {Object.keys(themes).map(k=>{
                    return(<option value={k}>{k}</option>)
                })}
                </select>
        </div>
    )
}