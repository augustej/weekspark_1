import arrow2 from "../../../../images/semicircular-arrow-svgrepo-com.svg"
import spark from "../../../../images/spark.svg"

function Child1NotLogged({toggleLoginProblem, loginVisProblemHid}){
    return(
      
        <div className="grid-child child1 not-logged">
            <img src={spark} alt="" className="spark-svg"/>
            <img src={arrow2} alt="" className="arrow-svg-right"/>
            <h1 className="big-text">Spark your weekends</h1>
            <button type="button" onClick={toggleLoginProblem} className="prompt-btn btn">
                {loginVisProblemHid? "Problem" : "Login"}
                </button>
        </div>
        
           
    )
}
export default Child1NotLogged
