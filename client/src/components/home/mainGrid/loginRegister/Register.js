import InputNewActivity from "../../../helperComponents/InputStyle"
import {useState} from "react"
import "../../../../css/registerLogin.css"

function Register({showRegistration}){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [errorMessages, setErrorMessages] = useState([])

    async function checkIfEmailAvailable(email, event){
        const res = await fetch("/api/email-check?email=" + email)
        const data = await res.json()
        let availability = false
        if (data !== false){availability = true}
        findErrors(event, availability)
    }

    function findErrors(event, availability){
         // Input validation:
         const currentErrorMessages = []
         if (!availability){
             currentErrorMessages.push(["Email is not available"])
         }
         if (email.length < 4){
             currentErrorMessages.push(["Email must be at least 4 char long"])
         }
         if (name.length < 2){
             currentErrorMessages.push(["Name must be at least 2 char long"])
         }
         if (pass1.length < 7){
             currentErrorMessages.push(["Password must be at least 7 char long"]) 
         }
         if (pass1 !== pass2){
             currentErrorMessages.push(["Passwords don't match"])
         }
         if (currentErrorMessages.length < 1){
             event.target.submit()
         }
         setErrorMessages(currentErrorMessages)    
    }

    function handleSubmit(event){
        event.preventDefault()
        checkIfEmailAvailable(email, event)
    }

    function handleNameChange(event){
        setName(event.target.value)
    }
    function handleEmailChange(event){
        setEmail(event.target.value)
    }
    function handlePass1Change(event){
        setPass1(event.target.value)
    }
    function handlePass2Change(event){
        setPass2(event.target.value)
    }

    return(
        <div className="grid-child text-card grid-child-form">

        <form action="/register" method="POST" onSubmit={handleSubmit} className="box-style-intro login-form">
        <h2 className="text-bold">Registration form</h2>

            {errorMessages.length > 0 ? 
                errorMessages.map(
                    function printMessages(message, index){
                        return(
                         <p key={index} className="error-msg text-light-uppercase">{message}</p>
                        )
                    }
                )
                : ""
            }

        < InputNewActivity
                classes={"registration-input text-light-uppercase input-label-container"}
                label="name"
                inputType="text"
                inputId="name"
                inputPlaceholder="name"
                required={true}
                onChange={handleNameChange}
                value={name}
                inputClass={"simple-text"}
            />
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
                onChange={handlePass1Change}
                value={pass1}
                classes={"registration-input text-light-uppercase input-label-container"}
                label="password"
                inputType="password"
                inputId="pass1"
                inputPlaceholder="password"
                required={true}
                inputClass={"simple-text"}

            />
             < InputNewActivity
                onChange={handlePass2Change}
                value={pass2}
                classes={"registration-input text-light-uppercase input-label-container"}
                label="password"
                inputType="password"
                inputId="pass2"
                inputPlaceholder="repeat password"
                required={true}
                inputClass={"simple-text"}

            />
            <div>
                <button type="submit" className="btn prompt-btn">Register</button>
                <button type='button' onClick={showRegistration} className="link-style-btn text-light-uppercase">To Login</button>
            </div>

        </form>
        </div>
    )
}
export default Register