import mountain from "../../../../images/mountain.svg"

function EmptyCard(){
    return(
        <div className="grid-child empty-card text-bold">
       
            <p>No suggestions so far.</p>     
            <p className="text-bold-uppercase text-highlight">It is time for your ideas!</p>   
            <p>Suggest activities from the list below </p>
            <p>or</p>
            <p>create a brand new activity! </p>  
            <img src={mountain} alt="mountain sketch" />

    </div>
    )
}
export default EmptyCard