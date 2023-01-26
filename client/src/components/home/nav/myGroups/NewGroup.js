import { useState } from "react"
import InputNewActivity from "../../../helperComponents/InputStyle"

function NewGroup({callRefreshGroups, currentGroup}){

    const [newMembersNumber, setNewMembersNumber ]= useState(1)
    const [joinGroupNumber, setJoinGroupNumber ]= useState(1)
    const [couldntInviteNew, setCouldntInviteNew] = useState([])
    const [couldntInviteJoin, setCouldntInviteJoin] = useState([])

    function memberInputField(number){
        return(
            < InputNewActivity
            classes={"input-label-container text-light-uppercase"}
            label="Email"
            inputType="email"
            inputId={`email-member${number}`}
            inputName="email-member"
            inputPlaceholder="johnsmith@gmail.com"
            inputClass="simple-text"
            />
        ) }
        
    const [newMembersArray, setNewMembersArray] = useState([memberInputField(newMembersNumber)])
    const [joinGroupArray, setJoinGroupArray] = useState([memberInputField(joinGroupNumber)])
    
    async function sendInvitations(event){
        const emailsArray = []
        const inputs = event.target.querySelectorAll('input')
        inputs.forEach(input =>{
            if (input.value.length > 0){
                emailsArray.push(input.value)
            } 
        })
        let group = ''
        if (event.target.classList.contains('new-group')){
            group = 'new'
        }
        else{
            group = currentGroup
        }

        const emailsDict = {'group':group, 'emails':emailsArray}
        const data = await fetch("/send-invitation", 
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(emailsDict)
            })
            callRefreshGroups()
        return data
    }

    async function handleSubmit(event){
        event.preventDefault()

        let newGroupFormSubmit
        if (event.target.classList.contains('new-group')){
            newGroupFormSubmit = true
        }
        else {newGroupFormSubmit = false}

        const data = await sendInvitations(event)
        const usersNotFound = await data.json()

        if (newGroupFormSubmit){
            setCouldntInviteNew([])
            if (usersNotFound.length > 0){
                setCouldntInviteNew(usersNotFound)    
            } 
            setNewMembersArray([])
        }
        else{
            setCouldntInviteJoin([])
            if (usersNotFound.length > 0){
                setCouldntInviteJoin(usersNotFound)
            }
            setJoinGroupArray([])
        }
        
        return usersNotFound
    }

    function addMoreNewMembers(){
        const newMemberNr = newMembersNumber + 1
        const newMember = memberInputField(newMemberNr)
        setNewMembersNumber(newMemberNr)
        setNewMembersArray(newMembersArray.concat(newMember))
    }
    function addMoreJoinMembers(){
        const newMemberNr = joinGroupNumber + 1
        const newMember = memberInputField(newMemberNr)
        setJoinGroupNumber(newMemberNr)
        setJoinGroupArray(joinGroupArray.concat(newMember))
    }

    function displayNotInvitedEmails(emailsList){
        return(
            <div className="not-invited-display">
                <h3 className="text-light-uppercase">Users not found: </h3>
                {emailsList.map((item, index) =>{
                    return(
                        <p key={index} className="small-text">{item}</p>
                    )
                })}
            </div>
        )
    }
    
    return(
         <>

            <form method="POST" onSubmit={handleSubmit} className="join-group" >
                <h2 className="text-bold-uppercase">Invite to Join</h2>

                <button type="button" onClick={addMoreJoinMembers} className="btn prompt-btn add-members">+ member</button>
                {couldntInviteJoin.length > 0 ? 
                    displayNotInvitedEmails(couldntInviteJoin): 
                    <p className="text-light-uppercase description">Invite other members to join current group.</p>
                }

                {joinGroupArray.map( 
                    function displayInvitationFields(member,index){
                        return(
                            <div key={index}>{member} </div>
                        )
                })}
            {joinGroupArray.length !== 0? 
                <button type="submit" className="btn prompt-btn send-invitations">Send Invitations!</button>
                : ""}    
            </form> 


            <form method="POST" onSubmit={handleSubmit} className="new-group" >
                <h2 className="text-bold-uppercase">New group</h2>

                <button type="button" onClick={addMoreNewMembers} className="btn prompt-btn add-members">+ member</button>
                {couldntInviteNew.length > 0 ? 
                    displayNotInvitedEmails(couldntInviteNew): 
                    <p className="text-light-uppercase description">Create new group by inviting other members.</p>
                }

                {newMembersArray.map( 
                    function displayInvitationFields(member,index){
                        return(
                            <div key={index}>{member} </div>
                        )
                })}
                {newMembersArray.length !== 0? 
                    <button type="submit" className="btn prompt-btn send-invitations">Send Invitations!</button>
                    : ""}    
            </form>

            
         </>
    )

}
export default NewGroup