import Login from "./loginRegister/Login.js"
import Child1 from "./child1/Child1"
import Problem from "./otherChildren/Problem"
import GameRules from "../nav/GameRules"
import LetsGo from "./otherChildren/LetsGo"
import Child2Decor from "./otherChildren/Child2Decor"
import Child2Status from "./child2Status/Child2Status"
import { useState, useEffect } from "react"
import GroupSuggestions from "./groupSuggestions/GroupSuggestions"
import "../../../css/activityCard.css"


function MainGrid({
    userLoggedIn, isUserLoggedIn, currentGroup, 
    upvotedActivities, callRefreshGroups, callRefreshVotes,
    votesUsed, otherMembers, winner }){

    const [loginVisProblemHid, setLoginVisProblemHid ] = useState(false)
    const [gridClass, setGridClass] = useState("full")

    const [groupSuggestions, setGroupSuggestions] = useState([])
    const [updateSuggestions, setUpdateSuggestions] = useState(false)

    useEffect(()=>{
        async function getGroupsSuggestions(){        
            const data = await fetch("/get-group-suggestions?group=" + currentGroup)
            const res = await data.json()
            setGroupSuggestions(res)
            if (res.length === 0){
                gridStyle("empty")
            }
            else{
                gridStyle("full")
            }
        }
        getGroupsSuggestions()
        
    }, [currentGroup, updateSuggestions]) 

    function callRefreshSuggestions(){
        setUpdateSuggestions(!updateSuggestions)
    }

    function toggleLoginProblem(){
        setLoginVisProblemHid(!loginVisProblemHid)
    }
  
    function gridStyle(gridClassName){
        setGridClass(gridClassName)
    }   




    return(
        <>
        <div className={`main-grid ${gridClass}`}>
            <Child1 
                userLoggedIn={userLoggedIn} 
                loginVisProblemHid={loginVisProblemHid}
                toggleLoginProblem={toggleLoginProblem}
            />            
            {userLoggedIn ?
                <>
                    <Child2Status
                        winner={winner}
                        votesUsed={votesUsed} 
                        otherMembers={otherMembers}
                        currentGroup={currentGroup}
                        callRefreshVotes={callRefreshVotes}
                        callRefreshSuggestions={callRefreshSuggestions}
                        groupSuggestions={groupSuggestions}
                    /> 
                    <GroupSuggestions 
                        currentGroup={currentGroup} 
                        upvotedActivities={upvotedActivities} 
                        callRefreshGroups={callRefreshGroups} 
                        callRefreshVotes={callRefreshVotes}
                        gridStyle={gridStyle}
                        groupSuggestions={groupSuggestions}
                        callRefreshSuggestions={callRefreshSuggestions}
                    /> 
                </> 
                
            : 
                <>
                    < Child2Decor/>
                    {loginVisProblemHid? 
                        <Login 
                            isUserLoggedIn={isUserLoggedIn}
                            /> 
                        : <Problem 
                    />}
                    <div className="grid-child text-card">
                        <GameRules forHomePage={true} />
                    </div>
                    <LetsGo />
                </>
            }
            
            
        </div>

    </>
    )
}
export default MainGrid