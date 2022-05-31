import './AcceptInvite.css'

export default function AcceptInvite () {
    return (
        <div className="accept-invite-body">
        <h1>Complete Registration</h1>

        <form>
            <input name="username" type="text" placeholder="username"/>
            <input name="email" type="email" placeholder="email"/>
            <input name="password" type="password" placeholder="password"/>
            <button type="submit">Submit Registration</button>
        </form>
        </div>
    )
}