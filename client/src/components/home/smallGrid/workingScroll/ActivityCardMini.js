import {Link} from "react-router-dom"
import DisplayImage from "../../../helperComponents/DisplayImage"

const ActivityCardMini = ({item}) =>{
    
    return (
        <div className="activity-card-mini grid-child">
            <Link to={`/activity/${item.id}`}>
            <div className="image-cont">
                { (item.images[0]  && item.images[0] !== ['']) ? 
                <DisplayImage public_id={item.images[0]} scale={350} /> 
                : <DisplayImage public_id={"sample"} scale={350} /> 
                }
            </div>
            <div className='text-part'>
                <h3 className="title text-light-uppercase">{item.name}</h3>
            </div>
            </Link>
        </div>
    )
}
export default ActivityCardMini