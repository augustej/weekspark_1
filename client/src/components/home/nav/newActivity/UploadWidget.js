// import {Cloudinary} from "@cloudinary/url-gen";
import {useState} from "react"

function UploadWidget(){

    const [imagesIds, setImagesIds] = useState([])
    let newImages = []

    function handleUpload(){
        myWidget.open()
    }

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_PRESET,
        maxFiles:5       
        },
      (error, result) => {
      

          if (!error && result && result.event === "success") {
              const newID = result.info['public_id']
              newImages.push(newID)
              setImagesIds(imagesIds.concat(...newImages))
          }
        }
      
    );

    return (
      <>
        <button id="upload_widget" className="cloudinary-button btn prompt-btn" type="button" onClick={handleUpload}>
          Upload
        </button>
        <input  className="hidden-image-ids" name="hidden-image-ids" type="text" defaultValue={imagesIds} />
        <p className="text-light-uppercase uploaded-img-status">Uploaded images = {imagesIds.length}/5</p>
      </>
      
    );
}
export default UploadWidget
