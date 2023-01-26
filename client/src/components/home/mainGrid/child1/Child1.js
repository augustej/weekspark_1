import Child1NotLogged from "./Child1NotLogged"
import Child1Logged from "./Child1Logged"

function MainGridChild1({userLoggedIn, toggleLoginProblem, loginVisProblemHid}){
    return(
        <>
            {userLoggedIn === true?
                <Child1Logged />
            :
                < Child1NotLogged
                    toggleLoginProblem={toggleLoginProblem} 
                    loginVisProblemHid={loginVisProblemHid}
                />
            }
        </>
    )
}
export default MainGridChild1
