import {useState} from "react"
import InputNewActivity from "../../../helperComponents/InputStyle"

function ActivityType(){
    const [activityType, setActivityType] = useState("city")

    function handleTypeChange(event){
        setActivityType(event.target.value)
    }

    function renderAscendAndDescend(){
        return(
            <>
                < InputNewActivity
                    classes={"input-label-container text-light-uppercase"}
                    label="Ascend (m)"
                    inputType="number"
                    inputId="activity-ascend"
                    inputPlaceholder="eg. 240"
                    inputClass={"simple-text"}

                />
                < InputNewActivity
                    classes={"input-label-container text-light-uppercase"}
                    label="Descend (m)"
                    inputType="number"
                    inputId="activity-descend"
                    inputPlaceholder="eg. 350"
                    inputClass={"simple-text"}

                />
            </>
        )
    }
    function renderDistance(){
        return(
            <>
                < InputNewActivity
                    classes={"input-label-container text-light-uppercase"}
                    label="Distance (km)"
                    inputType="number"
                    inputId="activity-distance"
                    inputPlaceholder="eg. 14"
                    inputClass={"simple-text"}
                />
            </>
        )
    }
    return(
        <>
            <div className="input-label-container text-light-uppercase">
                <label htmlFor="activity-type">Activity type</label>
                    <select className="simple-text" name="activity-type" id="activity-type" onChange={handleTypeChange} value={activityType} >
                    <option value="city" className="simple-text">City</option>
                    <option value="run" className="simple-text">Run</option>
                    <option value="walk" className="simple-text">Walk</option>
                    <option value="cycle" className="simple-text">Cycle</option>
                    <option value="kayak" className="simple-text">Kayak</option>
                    <option value="hike" className="simple-text">Hike</option>
                </select>
            </div>

            {activityType !== "city" ? renderDistance() : ""}
            {(activityType !== "city" && activityType !=='kayak') ? renderAscendAndDescend() : ""}
        </>
    )
}
export default ActivityType