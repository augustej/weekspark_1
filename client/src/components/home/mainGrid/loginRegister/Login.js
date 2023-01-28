import InputNewActivity from "../../../helperComponents/InputStyle"
import {useState} from "react"
import Register from "./Register"

function Login({isUserLoggedIn}){
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [registrationVisibility, setRegistrationVisibility] = useState(false)
    const [errorMessages, setErrorMessages] = useState("")

    function showRegistration(){
        setRegistrationVisibility(!registrationVisibility)
    }
    function handleEmailChange(event){
        setEmail(event.target.value)
    }
    function handlePassChange(event){
        setPass(event.target.value)
    }
    async function handleLogin(event){
        event.preventDefault()
        const formData = {'email':email,'pass':pass}
        const data = await fetch("/api/login",
            {
                headers: {"Content-Type" : "application/json"},
                method: 'POST',
                body: JSON.stringify(formData)

            })
        const response = await data.json()
        refreshMessages(response)
        }

    function refreshMessages(resp){
        if ('Success' in resp){
            setErrorMessages("")
            isUserLoggedIn()
        }
        else{
            setErrorMessages(resp['Error'])
        }
    }

    return(
            
        <>
        
        { !registrationVisibility ? 
        <div className="grid-child text-card grid-child-form">

        {errorMessages !== "" ? <p className="error-msg text-light-uppercase">{errorMessages}</p> : ""}
            <form  className="box-style-intro login-form" onSubmit={handleLogin}>
            <h2 className="text-bold">Login form</h2>

            < InputNewActivity
                    onChange={handleEmailChange}
                    value={email}
                    classes={"registration-input text-light-uppercase input-label-container"}
                    label="email"
                    inputType="email"
                    inputId="email"
                    inputPlaceholder="email"
                    required={true}
                    inputClass={"simple-text"}

                />
                < InputNewActivity
                    onChange={handlePassChange}
                    value={pass}
                    classes={"registration-input text-light-uppercase input-label-container"}
                    label="password"
                    inputType="password"
                    inputId="pass"
                    inputPlaceholder="password"
                    required={true}
                    inputClass={"simple-text"}

                />
                <div>
                    <button type="submit" className="btn prompt-btn">Login</button>
                    <button type='button' onClick={showRegistration} className="link-style-btn text-light-uppercase">I want to register</button>
                </div>
               
            </form>
        </div> :  <Register 
                    showRegistration={showRegistration} 
                    />}
        </>

    )
}
export default Login