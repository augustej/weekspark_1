import "../../../css/nav.css"
import { useState } from 'react';
import burger from "../../../images/burger.svg"
import close from "../../../images/close.svg"
import {Link} from "react-router-dom"
import NewActivity from "./newActivity/NewActivity"
import GameRules from "./GameRules"
import MyGroups from "./myGroups/MyGroups";
import Invitations from "./Invitations";

function Nav({userLoggedIn, libraries, isLoaded, callRefreshGroups,
    groups, refreshInvitations, invitations, currentGroup, changeCurrentGroup
 }){

    const [newActivityVisibility, setNewActivityVisibility] = useState(false)
    const [gameRulesVisibility, setGameRulesVisibility] = useState(false)
    const [invitationsVisibility, setInvitationsVisibility] = useState(false)
    const [groupsVisibility, setGroupsVisibility] = useState(false)

    function handleLogout(){
        sessionStorage.setItem('currentGroup', null)
    }

    function closeModal(){
        setNewActivityVisibility(false)
        setGameRulesVisibility(false)
        setInvitationsVisibility(false)
        setGroupsVisibility(false)
    }
   
    function createNewActivity(){
        setNewActivityVisibility(true)
    }
    function showGameRules(){
        setGameRulesVisibility(true)
    }
    function showInvitations(){
        setInvitationsVisibility(true)
    }
    function showGroups(){
        setGroupsVisibility(true)
    }
    

    function showNavEl(){
        const navEl = document.querySelectorAll(".nav-li")
        let burgerIcon = document.querySelector(".burger-icon")
        let closeIcon = document.querySelector(".close-icon")

        navEl.forEach(liItem=>{
            liItem.classList.toggle("visible-on-side")
        })
        burgerIcon.classList.toggle("visible-on-side")
        closeIcon.classList.toggle("visible-on-side")
    }

    function createGameRulesDOM(){
        return(
            <div className="modal-container">
                <div className="modal-content game-rules">
                    <GameRules forHomePage={false} closeModal={closeModal}/>
                </div>
            </div>
        )
    }

    function createInvitationsDOM(){
        return(
            <Invitations 
                refreshInvitations={refreshInvitations} 
                invitations={invitations} 
                closeModal={closeModal}
                callRefreshGroups={callRefreshGroups} 
            />
        )
    }
    function createGroupsDOM(){
        return(
            <MyGroups 
                callRefreshGroups={callRefreshGroups} 
                groups={groups} 
                currentGroup={currentGroup} 
                changeCurrentGroup={changeCurrentGroup} 
                closeModal={closeModal}
            />
        )
    }

    if (userLoggedIn === false){
        return (
            <nav>
                <ul>
                    <li >
                        <Link className="text-bold-uppercase" to="/">WeekSpark</Link>
                    </li>
                    <li className="text-light-uppercase">
                        <button 
                            type="button" 
                            onClick={() => window.location = 'mailto:weekspark@gmail.com'} 
                            className="black-btn">Contact us</button>
                    </li>              
                </ul>
            </nav>
        )
    }

    else {
        return(
            <>            
                <nav>
                    <ul>
                        <li >
                            <Link className="text-bold-uppercase" to="/">WeekSpark</Link></li>
                        <li className="burger-container mobile">
                            <button type="button" onClick={showNavEl}>
                            <img src={burger} alt="menu symbol" className="burger-icon visible-on-side"/>
                            <img src={close} alt="close menu symbol" className="close-icon"/>
                            </button>
                        </li>
                        <li className="text-light-uppercase nav-li desktop" onClick={showGroups}>Groups</li>
                        <li className="text-light-uppercase nav-li desktop" onClick={showInvitations}>
                            Invitations
                            {invitations.length > 0? <p className="new-invitations-nr">{invitations.length}</p> : ""}
                            </li>
                        <li className="text-light-uppercase nav-li desktop create-new-activity-btn" onClick={createNewActivity}>Create Activity</li>
                        <li className="text-light-uppercase nav-li desktop" onClick={showGameRules}>Game Rules</li>
                        <li className="nav-li desktop">
                            <form method="POST" action="/logout" onSubmit={handleLogout}>
                                <button type="submit" className="black-btn">Logout</button>
                            </form>
                        </li>
                        
                    </ul>
                </nav>
            {newActivityVisibility?
                <NewActivity libraries={libraries} closeModal={closeModal} isLoaded={isLoaded}/> 
                : ""}
            {gameRulesVisibility?
                createGameRulesDOM():""}
            {invitationsVisibility? 
                createInvitationsDOM() : ""}
            {groupsVisibility?
                createGroupsDOM():""}
            </>

        )
    }
}
export default Nav