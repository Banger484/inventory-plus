import './Header.css'

const enterpriseName = 'Appliance-World'
const userName = 'Bret'

export default function Header () {
    return (
        <header>
            <div className='header-enterprise'>
            <h1>{ enterpriseName }</h1>
            <p>Welcome, {userName}.</p>
            </div>
            <div className='header-logo'>
            <img src='/images/iplus.png' alt="Inventory+ Logo" />
            </div>

        </header>
    )
}