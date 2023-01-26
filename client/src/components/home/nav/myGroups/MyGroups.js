import close from "../../../../images/close.svg"
import "../../../../css/mygroups.css"
import NewGroup from "./NewGroup"

const MyGroups = ({groups, callRefreshGroups, currentGroup, changeCurrentGroup, closeModal}) =>{

    function leaveGroup(groupID){
        fetch("/leave-group",
        {
            headers:{'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(groupID)
        })
        callRefreshGroups()
    }

    function displayNotYetResponded(group){
        return(
            <>
                <p className="simple-text">Invited users: </p> 
                {group.waitingToRespond.map((member, index)=>{
                    return(
                        <li key={index} className="simple-text">{member}</li>
                    )
                })}
            </>
        )
    }

    function displayGroups(){
        return(
            <>
                <h2 className="text-bold-uppercase">My groups</h2>
                <p className="text-light-uppercase description">Switch group by clicking on it.</p>
                {groups.map((group, index)=>{
                    
                    let leaveBtnStatus = false
                    if (groups.length === 1){leaveBtnStatus = true}
                    
                    let classToApply = ""
                    if (parseInt(currentGroup) === parseInt(group.id)){
                        classToApply="one-group modal-content current-group"}
                    else{classToApply="one-group modal-content"}

                    return(
                        <div  
                            key={index} 
                            className={classToApply}
                            onClick={()=>changeCurrentGroup(group.id)} 
                        >
                            <ul 
                            className="group-members-list simple-text"
                            
                            >
                                {(parseInt(currentGroup) === parseInt(group.id)) ? 
                                    <li className="simple-text-bold">Current group</li> 
                                    : <li className="simple-text-bold">Members</li>
                                }
                                {group.members.map((member, index)=>{
                                    return(
                                        <li key={index}>{member}</li>
                                    )
                                })}

                            </ul>
                            <ul className="invited-no-resp">
                                {group.waitingToRespond.length >0 ? 
                                    displayNotYetResponded(group)
                                    :""}
                            </ul>
                            <button 
                                type="button" 
                                onClick={()=>leaveGroup(group.id)} 
                                className="black-btn leave-group"
                                disabled={leaveBtnStatus}
                            >
                                Leave
                            </button>
                        </div>
                    )
                })}
            </>
        )
    }
    return(
        <div className="modal-container">
            <div className="groups modal-content">
                <img src={close} alt="close symbol" className="close-modal-btn" onClick={closeModal}/>
                
                {groups.length> 0 ? displayGroups() :''}
                <NewGroup currentGroup={currentGroup} callRefreshGroups={callRefreshGroups} />
            </div>
        </div>
    )
}
export default MyGroups

