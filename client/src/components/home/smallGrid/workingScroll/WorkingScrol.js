import React, { useEffect } from "react";
import {useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import ActivityCardMini from "./ActivityCardMini";
// import ActivityCardMid from "../unused/ActivityCardMid";


function WorkingScrol({originLat, originLng}) {

    const [activitiesToShow, setActivitiesToShow] = useState([])
    const [dataRound, setDataRound] = useState(0)
    const [hasMoreValue, setHasMoreValue] = useState(true)
    const [appliedOrigin, setAppliedOrigin] = useState(originLat)

    useEffect(()=>{
        if (appliedOrigin !== originLat){
            setAppliedOrigin(originLat)
            setDataRound(0)
            setActivitiesToShow([])
            setHasMoreValue(true)
        }
        async function initialData(){
            const res = await fetch("/api/scroll?nr=0&lat=" + originLat + "&lng=" + originLng)
            const data = await res.json()  
            setActivitiesToShow(data)
            setDataRound(dataRound + 1)
        }
        initialData()
    // eslint-disable-next-line
    }, [originLat, appliedOrigin, originLng])

    async function fetchMoreData() {
        const res = await fetch("/api/scroll?nr=" + dataRound + "&lat=" + originLat + "&lng=" + originLng)
        const data = await res.json()  
        if (data === []){setHasMoreValue(false)}
        setActivitiesToShow(activitiesToShow.concat(data))
        setDataRound(dataRound + 1)
    };

    function displayMiniCards(activity){ 
        return (
            < ActivityCardMini item={activity} key={activity.id} />
        )
    }
    function displayEmptyCards(){
        const numberToDisplayPerRound = 9
        let numberOfEmptyCards
        if (activitiesToShow.length > numberToDisplayPerRound){ 
            numberOfEmptyCards= numberToDisplayPerRound - (activitiesToShow.length % numberToDisplayPerRound)
        }
        else{
            numberOfEmptyCards= numberToDisplayPerRound - activitiesToShow.length
        }
       
        return(
            [...Array(numberOfEmptyCards)].map((e,i)=>{
                return(
                    <div key ={i} className="activity-card-mini empty grid-child"></div>
                )
            })
        )
    }

    return (
      <>
        <InfiniteScroll dataLength={activitiesToShow.length} next={fetchMoreData} hasMore={hasMoreValue} className="small-grid">
            {activitiesToShow.map((activity) => displayMiniCards(activity))}
            {displayEmptyCards()}
        </InfiniteScroll>
      </>
    );

}
export default WorkingScrol