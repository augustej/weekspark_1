/*global google*/
import {useState, useEffect} from "react"

const DistanceDuration = ({activity, origin, libraries, isLoaded}) =>{    
    
    const [distance, setDistance] = useState("")
    const [durationHours, setDurationHours] = useState("")
    const [durationMinutes, setDurationMinutes] = useState("")

    useEffect(()=>{
        async function calculateRoute(){
            if (origin === "" || activity.destination === ""){
                return
            }
            const directionsService = new google.maps.DirectionsService()
            const results = await directionsService.route({
                origin: origin,
                destination: activity.destination,
                travelMode: google.maps.TravelMode.DRIVING
            })  
            setDistance(Math.floor(results.routes[0].legs[0].distance.value/1000))
            const hours = Math.floor(results.routes[0].legs[0].duration.value/3600)
            setDurationHours(hours)
            setDurationMinutes(Math.floor(results.routes[0].legs[0].duration.value/60 - (hours*60)))
        }
        calculateRoute()
    },[origin, activity.destination])
    
    return (

        <> 
            { distance? 
                <div className='detail-item '>
                    <h2 className="travel-distance">Trip distance </h2>
                    <p className="text-light-uppercase">{distance} km</p>
                </div>
                :""
            }
            { durationMinutes? 
                <div className='detail-item '>
                    <h2 className="travel-duration">Trip duration</h2>
                    <p className="text-light-uppercase">{`${durationHours} h ${durationMinutes} min`}</p>
                </div>
                :""
            }
        </>
    
    )}
export default DistanceDuration