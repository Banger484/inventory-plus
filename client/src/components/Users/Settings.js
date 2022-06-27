import { themes } from "../../themes"
import { useMutation } from "@apollo/client"
import { SET_THEME,ADD_AVATAR } from "../../utils/mutations"
import { useState } from "react"
import { DropBox } from "../Tools/DropBox"
import "../Tools/DropBox.css"
import './settings.css'


export const Settings = ({handleThemeChange,user,handleHeaderRefresh})=>{
    console.log(user)
const [avatar,setAvatar] = useState(user.data.avatar)
const [setTheme,{data:setThemeData,error:setThemeError}] = useMutation(SET_THEME)
const [addAvatar,{data:addAvatarData}] = useMutation(ADD_AVATAR)
const userId = user.data._id
const handleThemeChangeAndSetThemeForUser = async (e)=>{
    handleThemeChange(e)
    const variables = {userId,theme:e.target.value};
    const resp = await setTheme({variables})
}

const handleDropBoxDrop = async (key)=>{
    console.log(key);
    setAvatar(key);
    await addAvatar({variables:{avatar:key,userId}})
    handleHeaderRefresh()
}

const handleRenderDropBox = ()=>{
    setAvatar(false)
}
 
    return (
        <div className="settings-menu">
            <select onChange={handleThemeChangeAndSetThemeForUser}>
                {Object.keys(themes).map(k=>{
                    return(<option value={k}>{k}</option>)
                })}
                </select>
                {avatar?(<>
                <div className="avatar-cont">

                <img className="avatar-image" src={"/images/"+avatar}/>
                </div>
                <button onClick={handleRenderDropBox}>Set New Avatar</button>
                </>
                ):(
                <DropBox imageKey={avatar} setImageKey={handleDropBoxDrop}/>
                )}
        </div>
    )
}
