/* eslint-disable no-unused-vars */

import {useJsApiLoader, Autocomplete} from '@react-google-maps/api'
/*global google*/

function Destination({libraries, destinationRef} ){

    return(
        <div className='input-label-container text-light-uppercase'>
            <label>Location of Activity</label>
            <Autocomplete className='spec-input'>
                <input required={true} className="simple-text" ref={destinationRef} type="text" placeholder='Start typing' id="destination" name="destination"></input>
            </Autocomplete>
        </div>
        
    )
}
export default Destination