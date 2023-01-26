import arrow2 from "../../../images/semicircular-arrow-svgrepo-com.svg"
import OriginLocation from "./OriginLocation"

function AllActivTitle({origin, saveOrigin, libraries }){
    return(
        <div className="all-activities-title">
            <div className="grid-child">
                <img src={arrow2} alt="" className="arrow-svg"/>
            </div>
            <div className="grid-child with-origin-location">
                <h2 className="big-text">All activities</h2>
                {origin !== ""? 
                    <p className="small-text">Current location: {origin}</p> 
                    :""
                }
                <OriginLocation 
                    saveOrigin={saveOrigin} 
                    libraries={libraries} 
                /> 
            </div>
        </div>
    )
}
export default AllActivTitle