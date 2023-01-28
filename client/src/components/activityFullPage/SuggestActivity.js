import {useState} from "react"

const SuggestActivity = ({activity, groups, callRefreshGroups}) =>{    
    
    const [displayGroups, setDisplayGroups] = useState(false)

    function suggestActivity(id){
        const dictToSend = {"activity":activity.id, "group":id, "action":"suggest"}
        fetch("/api/suggest-activity",
            {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dictToSend)}
        )
        callRefreshGroups()
    }

    function chooseGroupToSuggestActivity(){
        setDisplayGroups(true)
    } 
    function chooseThisGroup(id){
        suggestActivity(id)
        setDisplayGroups(false)
    }

    function displayAllowedGroups(group, index){
        if (group.suggestionsNr === 3){
            return ""
        }
        else{
            return(
                <ul key={index} onClick={()=>chooseThisGroup(group.id)}>
                    {group.members.map((member, index)=>{
                        return(
                            <li key={index} className="simple-text">{member}</li>
                        )
                    })}
                </ul>  
            )                                                
        }
    }

    function groupDisplayInDom(){
        return(
            <div className="choose-group-for-suggestion">
                {groups.map((group, index) => displayAllowedGroups(group, index))}
            </div>
        )
    }
    return (

        <>
            <button className={`btn prompt-btn suggest-activity ${displayGroups ? "choose-group" : ""}`} 
            onClick={chooseGroupToSuggestActivity}>
                {displayGroups ? "Choose a group :" : "Suggest for this week!"}
            </button>
            {displayGroups ? groupDisplayInDom() : ""}
        </>
    
    )}
export default SuggestActivity