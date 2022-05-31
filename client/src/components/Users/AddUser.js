import emailjs from '@emailjs/browser';

export default function AddUser () {
    const enterpriseId ="adfadfads5656153ds"
    const link = `https://inventoryplus.herokuapp.com/invite/${enterpriseId}`
    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('gmail', 'template_op0417e', e.target, 'LXAuyeYFRIN_Vzkeh')
        console.log(e.target)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }
    return (
        <div>
            <h1>Invite User</h1>
            <form onSubmit= {sendEmail}>
                <input name="user_email" type="email"></input>
                <input name="enterpriseId" type="text" value={link}></input>
                <button type='submit' value="Send">Send Invite</button>
            </form>
        </div>
    )
}