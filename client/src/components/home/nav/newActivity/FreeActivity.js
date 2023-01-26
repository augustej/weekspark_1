import {useState} from "react"
import InputNewActivity from "../../../helperComponents/InputStyle"

function FreeActivity(){
    const [activityFree, setActivityFree] = useState(true)
    function handleActivityStateChange(){
        setActivityFree(!activityFree)
    }
    function renderItemsForNonFreeActivities(){
        return(
            <>
                < InputNewActivity
                    classes={"input-label-container text-light-uppercase"}
                    label="Activity Price (euros)"
                    inputType="number"
                    inputId="activity-price"
                    inputPlaceholder="eg. 140"
                    inputClass={"simple-text"}
                />
                < InputNewActivity
                    classes={"input-label-container text-light-uppercase"}
                    label="Transportation Price (euros)"
                    inputType="number"
                    inputId="transportation-price"
                    inputPlaceholder="eg. 40"
                    inputClass={"simple-text"}

                />
            </>
        )
    }

    return(
        <>
            < InputNewActivity
                classes={"input-label-container checkbox text-light-uppercase"}
                label="Activity is free!"
                inputType="checkbox"
                inputId="free-activity"
                checked={activityFree}
                onChange={handleActivityStateChange} 
                inputClass={"simple-text"}

            />

            {activityFree !== true ? renderItemsForNonFreeActivities() : ""}
    
        </>
    )

}
export default FreeActivity