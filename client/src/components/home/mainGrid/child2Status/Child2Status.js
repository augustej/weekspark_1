import MyVotes from "./MyVotes"
import WinnerCard from "./WinnerCard"
import {useState} from "react"

function Child2Status({
    votesUsed, otherMembers, currentGroup, groupSuggestions, callRefreshSuggestions, winner, callRefreshVotes
}){

    return(
        <div className="grid-child child2 text-card logged">
            <div className="text-side">
                <h2 className="text-bold">Group Info</h2>
                < MyVotes 
                    votesUsed={votesUsed}
                    otherMembers={otherMembers} 
                    currentGroup={currentGroup} 
                    callRefreshVotes={callRefreshVotes}
                    callRefreshSuggestions={callRefreshSuggestions}
                    groupSuggestions={groupSuggestions}

                />
            </div>
            
            {winner? 
                <WinnerCard activity={winner}/>
                : ""
            }
            
        </div>
    )
}
export default Child2Status