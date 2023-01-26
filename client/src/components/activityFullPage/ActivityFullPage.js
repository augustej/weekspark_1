import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react"
import DistanceDuration from "./Distance&Duration"
import SuggestActivity from "./SuggestActivity"
import DisplayImage from "../helperComponents/DisplayImage"
import "../../css/activityFullPage.css";
import "../../css/newHome.css"
/*global google*/

const ActivityFullPage = ({origin, groups, callRefreshVotes, libraries, isLoaded, callRefreshGroups}) =>{    
    
    const pageParams=useParams()
    const [activity, setActivity]= useState({})

    useEffect(()=>{
        async function getActivity(){
            const data = await fetch('/get-activity?activityID=' + pageParams.id) 
            const res = await data.json()
            setActivity(res)
        }
        getActivity()        
    }, [])

  
    if (!isLoaded){
        return <h1 className="text-bold">Loading</h1>
    }

    return (

        <div className="modal-container">
        {activity.name !== undefined? 
        <div className='activity-full-page modal-content'>
            <h1 className="title text-bold-uppercase">{activity.name}</h1>
            {groups.length>0?
                <SuggestActivity callRefreshVotes={callRefreshVotes} activity={activity} groups={groups} callRefreshGroups={callRefreshGroups}/>
                :""
            }

            { (activity.images[0] && activity.images !== [''] ) ?  
            <div className='image-galery'>
                
                {activity.images.map(
                    function reflectImageInDom (image) {
                        let imageScale = 0
                        if (activity.images.map.length === 1){
                            imageScale = 1000
                        }
                        else {imageScale = 550}

                    return(
                        <div key={image}>
                            <DisplayImage public_id={image} scale={imageScale} />
                        </div>
                    )}
                 )}
                
            </div> : ""}

            <div className="activity-details-and-description">
                <div className='activity-details'>
                    <div className='detail-item'>
                        <p className="type text-bold">{activity.type}</p>
                    </div>
                    { activity.destination? 
                        <div className='detail-item'>
                            <div className='location-icon'>
                                <div className='top-bubble'></div>
                                <div className='small-bubble'></div>
                                <div className='triangle'></div>
                            </div>
                            <p className="destination text-light-uppercase">{activity.destination}</p>
                        </div>
                        :""
                    }
                    { activity.duration? 
                        <div className='detail-item '>
                            <h2>Duration</h2>
                            <p className="duration text-light-uppercase">{activity.duration} h</p>
                        </div>
                        :""
                    }  
                    { activity.distance? 
                        <div className='detail-item'>
                            <h2>Distance</h2>
                            <p className="distance text-light-uppercase"> {activity.distance} km</p>
                        </div>
                        :""
                    }
                    { activity.ascend?  
                        <div className='detail-item'>
                            <h2>Ascend</h2>
                            <p className="ascend text-light-uppercase"> {activity.ascend} m</p>
                        </div>
                        : ""
                    }
                    { activity.descend? 
                        <div className='detail-item'>
                            <h2>Descend</h2>
                            <p className="descend text-light-uppercase"> {activity.descend} m</p>
                        </div>
                        :""
                    }
                    <DistanceDuration activity={activity} origin={origin} libraries={libraries} isLoaded={isLoaded} />
                    
                    { activity.activity_price?  
                        <div className='detail-item price-detail'>
                            <p className="price text-bold">€{activity.activity_price} </p>
                            <p className="text-light-uppercase"> per person</p>
                        </div>
                        :""
                    }
                    { activity.transportation_price? 
                        <div className='detail-item transport-price-detail'>
                            <p className="price text-bold">€{activity.transportation_price} extra</p>
                            <p className="text-light-uppercase"> for transport</p>
                        </div>
                        :""
                    }
                    
                </div>
                <div className='description'>
                    <p className="simple-text">{activity.description}</p> 
                </div>
            </div>
            
            <div className='bottom-part'>
                { activity.usefull_links ? 

                    <div className='usefull-links '>
                        <h3 className="simple-text title">Useful Links:</h3>
                        {Object.keys(activity.usefull_links).map(
                            function showUsefulLinks(key) {
                                return(
                                    <a href={activity.usefull_links[key]} key={key} className="simple-text">{key}</a>
                                )
                            }
                        )}
                    </div>
                    :""
                }
                <div className="buttons">
                    {/* TODO modify */}
                    {/* <button className="btn">Modify</button> */}
                    <Link to="/"><button className=" black-btn go-home">Back to Home</button></Link>
                </div>
                
            </div>
        </div>
        : ""}
        
    </div>
    
    )}
export default ActivityFullPage