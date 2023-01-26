import InputNewActivity from "../../../helperComponents/InputStyle"
import UsefullLinks from "./UsefullLinks"
import FreeActivity from "./FreeActivity"
import ActivityType from "./ActivityType"
import Destination from "./Destination"
import UploadWidget from "./UploadWidget"
import { useRef} from "react"
import "../../../../css/createNewAct.css"
import closeBtn from "../../../../images/close.svg"
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const NewActivity =({libraries, isLoaded, closeModal}) =>{

    const destinationRef = useRef()

    async function handleSubmit(event){
        event.preventDefault()
        let formToSend = new FormData(event.target)
       
        geocodeByAddress(destinationRef.current.value)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) =>
            {
                formToSend.append('lat', lat)
                formToSend.append('lng', lng)
                fetch('/create-new-actvity', {
                    method: 'POST',
                    body: formToSend
                  }
                )
                window.location.reload(true)
            });
        closeModal()
    }
   
    if (!isLoaded){
        return <h1>Loading...</h1>
    }
    return(
        <div className="page-container modal-container">
        <form className="new-activity-form form modal-content" method="POST" action="/create-new-actvity" onSubmit={handleSubmit}>
            <h1 className="text-bold-uppercase">Add new Activity</h1>
            <button type="button" onClick={closeModal}>
                <img src={closeBtn} alt="close symbol" className="close-modal-btn"/>
            </button>

            < InputNewActivity
                classes={"input-label-container text-light-uppercase"}
                label="Title"
                inputType="text"
                inputId="activity-name"
                inputPlaceholder="eg. Visiting Barcelona"
                required={true}
                inputClass={"simple-text"}

            />
            < InputNewActivity
                classes={"input-label-container text-light-uppercase"}
                label="Duration of activity itself (hours)"
                inputType="number"
                inputId="activity-duration"
                inputPlaceholder="eg. 24"
                inputClass={"simple-text"}
                step={0.25}
                min={0.25}

            />

            <ActivityType />
            <Destination libraries={libraries} destinationRef={destinationRef}/>
            
            
            <div className="input-label-container text-light-uppercase">
                <label htmlFor="activity-description">Description</label>
                <textarea className="simple-text" name="activity-description" id="activity-description" placeholder="This trip starts at the train station..."></textarea>
            </div>
            
            <FreeActivity />
            <UsefullLinks />
            <div className="title-and-btn">
                <h3 className="text-bold">Add Images</h3>
                <p className="text-light-uppercase">(max 5)</p>
                < UploadWidget />
            </div>

            <button className="btn prompt-btn" type="submit" >Save</button>
              
           
        </form>
        </div>

    )
}
export default NewActivity
