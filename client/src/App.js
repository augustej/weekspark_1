import {useState, useEffect} from "react"
import ActivityFullPage from "./components/activityFullPage/ActivityFullPage"
import {Routes, Route} from "react-router-dom"
import NewHome from "./components/home/NewHome"
import {useJsApiLoader} from '@react-google-maps/api'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

function App() {
  const [currentGroup, setCurrentGroup] = useState(null)
  const [invitations, setInvitations] = useState([])
  const [groups, setGroups] = useState([])
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [updateInvitations, setUpdateInvitations] = useState(false)
  const [updateGroups, setUpdateGroups] = useState(false)

  function changeCurrentGroup(id){
    setCurrentGroup(id)
    sessionStorage.setItem("currentGroup", id)
  }  
  
  useEffect(()=>{
    if (userLoggedIn) {
      async function getInvitationsAndGroups(){
        const data = await fetch("/api/get-invitations-and-groups")
        const joinedData = await data.json()
        joinedData.forEach((dictionary)=>{
          if (dictionary['invitations']){
            setInvitations(dictionary['invitations'])
          }
          else{
            setGroups(dictionary['groups'])
            if (dictionary['groups'].length > 0){
              let dataFromSession = parseInt(sessionStorage.getItem("currentGroup"))
              if (Number.isInteger(dataFromSession) === false){
                changeCurrentGroup(dictionary['groups'][0].id)
              }
              else{
                changeCurrentGroup(sessionStorage.getItem("currentGroup"))
              }
            }
          }
        })
      }
      getInvitationsAndGroups()

    }
  }, [userLoggedIn, updateInvitations, updateGroups
  ])

  function refreshInvitations(){
    setUpdateInvitations(!updateInvitations)
  }

  function callRefreshGroups(){
    setUpdateGroups(!updateGroups)
  }

  async function isUserLoggedIn(){
    const data = await fetch("/api/is-user-logged-in")
    const response = await data.json()
    if (response === true){
      setUserLoggedIn(true)
      return
    }
    setUserLoggedIn(false)
  }

  const [ libraries ] = useState(['places']);
  const {isLoaded} = useJsApiLoader({
      libraries,
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  }) 

  const [origin, setOrigin] = useState("")
  const [originLat, setOriginLat] = useState(0)
  const [originLng, setOriginLng] = useState(0)
  
  function saveOrigin(originFromInput){
      setOrigin(originFromInput.current.value) 
      geocodeByAddress(originFromInput.current.value)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
      {
        setOriginLat(lat)
        setOriginLng(lng)
      })
      originFromInput.current.value = ""
  }

  isUserLoggedIn()
  
  return (
    <Routes>
      <Route path="/" element={
        <NewHome 
        originLat={originLat} originLng={originLng} refreshInvitations={()=>refreshInvitations()} invitations={invitations} groups={groups} 
        userLoggedIn={userLoggedIn} currentGroup={currentGroup} changeCurrentGroup={changeCurrentGroup} 
        saveOrigin={saveOrigin} origin={origin} libraries={libraries} isLoaded={isLoaded}
        callRefreshGroups={()=>callRefreshGroups()} isUserLoggedIn={()=>isUserLoggedIn()}
        />} 
      />
      <Route path="/activity"> 
        <Route path=":id" element={ <ActivityFullPage callRefreshGroups={()=>callRefreshGroups()} origin={origin} groups={groups} isLoaded={isLoaded} libraries={libraries}/> } ></Route>
      </Route>
       {/* <Route path="/add-new-activity" element={< NewActivity libraries={libraries} isLoaded={isLoaded}/>}></Route> */}
    </Routes>
  )
}

export default App