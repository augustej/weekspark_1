import {useJsApiLoader, Autocomplete} from '@react-google-maps/api'
import {useRef} from "react"
/*global google*/

function OriginLocation( {saveOrigin, libraries} ){
    const originRef = useRef()
    return(
        <div className='origin-container'>
            <p className='text-light-uppercase'>Filter activities based on distance from your location</p>
                <Autocomplete className='input-label-container'>
                    <input ref={originRef} type="text" placeholder='Location' id="origin" className='simple-text'></input>
                </Autocomplete>
                <button type="button" className='btn prompt-btn' onClick={()=>saveOrigin(originRef)}>Go!</button>
        </div>
        
    )
}
export default OriginLocation