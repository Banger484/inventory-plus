const { default: auth } = require("../../utils/auth")


export const Logout = ()=>{

    const handleLogoutButton = ()=>{
        auth.logout()
    }

    return(
        <button onClick={handleLogoutButton}>
            Logout
        </button>
    )
}