function MyVotes({votesUsed, otherMembers, groupSuggestions, callRefreshSuggestions, currentGroup, callRefreshVotes}){

    async function pickWinnerActivity(){
        const winnerData = await 
        fetch("/api/get-winner-activity?groupID=" + currentGroup)
        await winnerData.json()
        callRefreshVotes()
        callRefreshSuggestions()
    }

    return(
        <>
            <h3 className="text-light-uppercase">Group members & Unused votes</h3>
            <div>
                <p className="simple-text">Me: {2-votesUsed}</p>   
                {otherMembers.map((member, index) =>{
                    return(
                        <p className="simple-text" key={index}>
                            {member['member']}: {2 - member['votesUsed']}
                        </p>
                    )
                })}
            </div>
            {groupSuggestions.length > 0 ? 
                <button 
                    type="button" 
                    onClick={pickWinnerActivity} 
                    className="btn prompt-btn">
                    Get the winner!
                </button>
            : ""}
        </>
       
    )
}
export default MyVotes
