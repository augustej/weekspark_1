import close from "../../../images/close.svg"


function GameRules({forHomePage, closeModal}){
    return(
        <>               
            {forHomePage === true ? 
                <> 
                    <h2 className="text-bold">Solution is a game</h2>
                    <p className="text-light-uppercase">
                        Suggest activities and let lottery decide.
                    </p>
                    <h3 className="text-bold">Rules for each week</h3>

                </>
            :     
                <>                
                    <img src={close} alt="close symbol" className="close-modal-btn" onClick={closeModal}/>
                    <h3 className="text-bold-uppercase">Rules for each week</h3>
                </>
            }
            <ul className="simple-text">
                <li>Member can suggest up to 3 activities and has 2 votes</li>
                <li>Once you click on "Get the winner!" button, lottery happens</li>
                <li>Each suggested activity can become a winner but upvoted ones have higher chances</li>
                <li>If you keep the same activity in suggestions for next week, previous votes accumulate</li>
            </ul> 
        </>
    )

}
export default GameRules