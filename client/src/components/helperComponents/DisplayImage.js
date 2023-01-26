import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {thumbnail} from "@cloudinary/url-gen/actions/resize";


function DisplayImage({public_id, scale}){

    function getCloudImage(public_id){
        const cld = new Cloudinary({
            cloud: {
            cloudName: 'dk5bctt3y'
            }
        });
        const myImage = cld.image(public_id).resize(thumbnail().width(scale))
        return myImage   
    }

    return(
        < AdvancedImage cldImg={getCloudImage(public_id)} />
    )
    
}
export default DisplayImage