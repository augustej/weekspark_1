import {Link} from "react-router-dom"
import DisplayImage from "../../../helperComponents/DisplayImage"

function WinnerCard({activity}){

return (
    <div className="winner-activity-area">
        <h3 className="text-bold">Winner</h3>
        <div className="activity-card-mini winner-card">
            <Link to={`/activity/${activity.id}`}>
                { (activity.images[0]  && activity.images[0] !== ['']) ? 
                    <DisplayImage public_id={activity.images[0]} scale={250} /> 
                    : <DisplayImage public_id="sample" scale={250} />
                }
                <h4 className="title text-light-uppercase">{activity.name}</h4>
            </Link>
        </div>
    </div>
    
)
}
export default WinnerCard