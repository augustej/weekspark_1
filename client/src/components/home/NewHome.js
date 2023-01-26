import Nav from "./nav/Nav"
import MainGrid from "./mainGrid/MainGrid";
import "../../css/newHome.css";
import AllActivTitle from "./allActivTitle/AllActivTitle"
import SmallGrid from "./smallGrid/SmallGrid";
import {useState, useEffect} from "react"

function NewHome({ 
    originLat, originLng,
    userLoggedIn, invitations, groups, changeCurrentGroup, currentGroup, isUserLoggedIn,
    saveOrigin, origin, libraries, isLoaded, refreshInvitations, callRefreshGroups}) {

    const[upvotedActivities, setUpvotedActivities] = useState([])
    const [votesUsed, setVotesUsed] = useState(0)
    const [refreshVotes, setRefreshVotes] = useState(false)
    const [otherMembers, setOtherMembers] = useState([])
    const [winner, setWinner] = useState(null)

    useEffect(()=>{
        if (userLoggedIn){
            async function getVotes(){
                const data = await fetch("/get-user-votes?groupID=" + currentGroup)
                const dict = await data.json()
                setUpvotedActivities(dict['voted_for'])   
                setVotesUsed(dict['used_votes'])
                setOtherMembers(dict['other_members'])
                setWinner(dict['winner'][0])
                }
            getVotes()
        }    
    }, [refreshVotes, currentGroup])

    function callRefreshVotes(){
        setRefreshVotes(!refreshVotes)
    }

    if (!isLoaded){
        return <h1 className="h1-style">Loading...</h1>
    }

    return(
        <>
            <Nav 
                userLoggedIn={userLoggedIn}
                libraries={libraries}
                isLoaded={isLoaded}
                callRefreshGroups = {callRefreshGroups}
                groups={groups}
                refreshInvitations={refreshInvitations}
                invitations={invitations}
                changeCurrentGroup={changeCurrentGroup}
                currentGroup={currentGroup}
            />
            <MainGrid 
                userLoggedIn={userLoggedIn} 
                isUserLoggedIn={isUserLoggedIn}
                callRefreshVotes={()=>callRefreshVotes()}
                upvotedActivities={upvotedActivities}
                currentGroup={currentGroup}
                votesUsed={votesUsed} 
                otherMembers={otherMembers}
                winner={winner} 
                changeCurrentGroup={changeCurrentGroup}
                callRefreshGroups={callRefreshGroups}
            />
            {userLoggedIn? 
                <>
                    <AllActivTitle 
                        origin={origin}
                        saveOrigin={saveOrigin} 
                        libraries={libraries}  />
                    <SmallGrid  
                        originLat={originLat} 
                        originLng={originLng}
                    />
                </>
                : ""
            }
            
        </>
        
    )
}
export default NewHome