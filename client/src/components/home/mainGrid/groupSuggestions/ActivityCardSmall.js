import {Link} from "react-router-dom"
import DisplayImage from "../../../helperComponents/DisplayImage"

const ActivityCardSmall = ({activity, upvotedActivities, currentGroup, 
    upvoted, callRefreshVotes, callRefreshSuggestions, callRefreshGroups}) =>{

    async function vote(id){
        const vote = {"groupID": currentGroup, "activityID":id}
        const getData = await fetch("/api/vote-for-activity",
        {
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body: JSON.stringify(vote)
        })
        const result = await getData.json()
        if (result === true){
            callRefreshVotes()
        }
    }
    // if upvoted = false and upvotedActivities.length == 2, disable btn.
    function allVotesUsed(){
        if ((upvoted === false) && (upvotedActivities.length === 2)){        
            return true
        }
        return false
    }

    async function removeFromSuggestions(id){
        const activityToRemove = {"group": currentGroup, "activity":id, "action":"remove"}
        const getData = await fetch("/api/suggest-activity",
        {
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body: JSON.stringify(activityToRemove)
        })
        const result = await getData.json()
        if (result === true){
            callRefreshSuggestions()
            callRefreshGroups()
            callRefreshVotes()
        }
    }
    
    return (
        <div className="grid-child activity-card-small">
            <Link to={`/activity/${activity.id}`}>

            { (activity.images[0]  && activity.images[0] !== ['']) ? 
                <DisplayImage public_id={activity.images[0]} scale={600} /> 
                : <DisplayImage public_id={"sample"} scale={600} /> 
            }
            <div className='text-part'>
            <div className='details text-light-uppercase'>
                    {activity.duration !== "" ? <p className="duration">{activity.duration} hours</p> : ""}
                    <p className="type">{activity.type}</p>
                    { activity.activity_price !== null ? <p className="price">{activity.activity_price} €</p>: ""}
                </div>
                <h3 className="title text-bold">{activity.name}</h3>
            </div>
            </Link>
            <div className="small-card-buttons">
                <button className='btn vote-btn prompt-btn' onClick={()=>vote(activity.id)} disabled={allVotesUsed()}>
                    {upvoted? "Unvote" : "Vote"}    
                </button>
                {activity.creator === true ? 
                    <button className="btn del-btn" type="button" onClick={()=>removeFromSuggestions(activity.id)}>Remove</button>
                    :""
                }
            </div>
        </div>
    )
}
export default ActivityCardSmall