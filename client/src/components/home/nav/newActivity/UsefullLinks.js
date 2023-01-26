import {useState} from "react"

function UsefullLinks(){

    const [linkInputFields, setLinkInputFields] = useState([linkInput()])
    function linkInput(){
        return(
            <div className="link">
                <div className="input-label-container text-light-uppercase">
                    <label htmlFor="activity-usefull-link">Link</label>
                    <input className="simple-text" type="text" name="activity-usefull-link" id="activity-usefull-link" placeholder="eg. https://www.omio.com/"/>                
                </div>
                <div className="input-label-container text-light-uppercase">
                    <label htmlFor="activity-usefull-link-name">Link Name</label>
                    <input className="simple-text" type="text" name="activity-usefull-link-name" id="activity-usefull-link-name"  placeholder="eg. Train schedule in Barca" />
                </div>
            </div>
        )
    } 
    function createNewLinkField(){
        const newLinkInput = linkInput()
        setLinkInputFields(linkInputFields.concat(newLinkInput))
    }

    return(
        <>
            <div className="title-and-btn">
                <h3 className="text-bold">Usefull Links</h3>             
                <button type="button" className="btn prompt-btn" onClick={createNewLinkField}>Add More Links</button>
            </div>
            {linkInputFields && linkInputFields.map((item,index) => <div className="usefull-links" key={index}>{item}</div>)}
        </>
    )
 }
export default UsefullLinks