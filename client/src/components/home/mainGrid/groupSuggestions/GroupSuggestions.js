import ActivityCardSmall from "./ActivityCardSmall"
import EmptyCard from "./EmptyCard.js"


function GroupSuggestions({currentGroup, groupSuggestions, callRefreshSuggestions, gridStyle, upvotedActivities, callRefreshGroups, callRefreshVotes}){

    function displayEmptyCards(){
        let numberOfEmptyCards
        if (groupSuggestions.length > 3){ 
            numberOfEmptyCards= 3 - (groupSuggestions.length % 3)
        }
        else{
            numberOfEmptyCards= 3 - groupSuggestions.length
        }

        if (groupSuggestions.length === 0){
            return(
                <EmptyCard />
            )
        }
        else{

            return(
                [...Array(numberOfEmptyCards)].map((e,i)=>{
                    return(
                        <div key={i} className="grid-child activity-card-small empty">
                        </div>
                    )
                })
            )
        }
    }


    function displayGroupSuggestions(){
        return(
            groupSuggestions.map(
                function displaySuggestedActivity(activity){
                    let upvoted = false
                    upvotedActivities.includes(activity.id) ? upvoted = true : upvoted = false
                    
                    return(
                        <ActivityCardSmall
                            callRefreshGroups={callRefreshGroups}
                            callRefreshSuggestions={()=>callRefreshSuggestions()}
                            upvotedActivities={upvotedActivities} 
                            upvoted= {upvoted}
                            activity={activity} 
                            key={activity.id} 
                            currentGroup={currentGroup} 
                            callRefreshVotes={()=>callRefreshVotes()}
                        />
                    )
                })
        )
    }

    return(
        <>
            {displayGroupSuggestions()}
            {displayEmptyCards()}
        </>
    )
}
export default GroupSuggestions
