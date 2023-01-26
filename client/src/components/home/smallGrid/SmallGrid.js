import WorkingScrol from "./workingScroll/WorkingScrol"

function SmallGrid({originLat, originLng}){
    return(
            <WorkingScrol 
            originLat={originLat} 
            originLng={originLng}
            />
    )
}
export default SmallGrid