import { themes } from "../../themes"
import { useMutation } from "@apollo/client"
import { SET_THEME,ADD_AVATAR } from "../../utils/mutations"
import { useState } from "react"
import { DropBox } from "../Tools/DropBox"
import "../Tools/DropBox.css"
import './settings.css'


export const Settings = ({handleThemeChange,user,handleAvatarPicChange})=>{
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
console.log('user', user.data);
const handleDropBoxDrop = async (key)=>{
    console.log(key);
    setAvatar(key);
    await addAvatar({variables:{avatar:key,userId}})
    handleAvatarPicChange(key)
}

const handleRenderDropBox = ()=>{
    setAvatar(false)
}
 
    return (
        <div className="settings-menu">
            <div className="settings-header">
                <h1>Preferences</h1>
            </div>
                <h2>User Information</h2>
                <h3>Name: {user.data.name}</h3>
                <h3>Email: {user.data.email}</h3>
                <h2>Profile Picture</h2>
                {avatar?(<>
                <div>

                <img className="avatar-image-settings" src={"/images/"+avatar} alt='avatar'/>
                </div>
                <button className="set-avatar" onClick={handleRenderDropBox}>Set New Avatar</button>
                </>
                ):(
                <div className="drop-container">
                    <DropBox imageKey={avatar} setImageKey={handleDropBoxDrop}/>
                </div>

                )}
                <h3>
                    Select your preferred theme.
                </h3>
                <select onChange={handleThemeChangeAndSetThemeForUser}>
                {Object.keys(themes).map(k=>{
                    return(<option value={k}>{k}</option>)
                })}
                </select>
        </div>
    )
}
