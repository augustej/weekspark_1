import close from "../../../images/close.svg"

const Invitations = ({refreshInvitations, callRefreshGroups, invitations, closeModal }) =>{

   function displayInvitations(){
       return(
           <div className="invitations-list">
               {invitations.map((invite,index) =>{
                   return(
                       <div className="invitation modal-content" 
                       key={index}>
                           <p className="simple-text">You have been invited by <span className="simple-text-bold">{invite.inviter}</span></p>
                           <button type="button" className="prompt-btn btn join" onClick={()=>respondGroup(invite.groupId, "join")}>Join!</button>
                           <button type="button" className="del-btn btn reject" onClick={()=>respondGroup(invite.groupId, "reject")}>Reject!</button>
                       </div>
                   )
               })}
           </div>
       )
   }

   async function respondGroup(groupId, answer){
    await fetch('/respond-invitation',
    {
        headers: {'Content-Type': 'application/json'},
        method:'POST',
        body: JSON.stringify({'groupID':groupId, 'answer':answer })
    })
    refreshInvitations()
    callRefreshGroups()
}
   
   return(
       <div className="modal-container">
           <div className="invitations modal-content">
                <img src={close} alt="close symbol" className="close-modal-btn" onClick={closeModal}/>

               <h2 className="text-bold-uppercase">My invitations</h2>
               {invitations.length > 0 ? displayInvitations() 
                : 
                    <p className="text-light-uppercase">You don't have new invitations.</p>}
           </div>
       </div>
   )
}
export default Invitations

