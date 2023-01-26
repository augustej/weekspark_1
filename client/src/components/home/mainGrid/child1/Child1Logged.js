import arrow2 from "../../../../images/semicircular-arrow-svgrepo-com.svg"
import spark from "../../../../images/spark.svg"

function Child1Logged(){
    return(
        <div className="grid-child child1 logged">
            <img src={spark} alt="" className="spark-svg"/>
            <h1 className="big-text">Suggested for the weekend</h1>
            <img src={arrow2} alt="" className="arrow-svg-down"/>
        </div>   
    )
}
export default Child1Logged