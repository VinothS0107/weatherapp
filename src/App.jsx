 import{ useState } from 'react'
import { CarouselSize } from './components/carousel/carousel'
import { Timecard } from './components/card/Timecard'
import { ComboboxDemo } from './components/combobox/selectDate'
import { Context } from './context/useContext'
import { MainContent } from './components/maindata/main'

let  now = new Date(); 
now = now.setDate(now.getDate() - 8);
const prefixDate = new Date (now);

function App() {
 const [selectedCity,setSelectedCity] = useState({startDate:prefixDate,endDate:new Date()})
 const [handleError,setError]=useState(null)
 const [responseData,setResponseData]=useState([])
 const [isGotData,setIsgotData] = useState (false)

// useEffect(()=>{},[responseData])

 const handlePostData= async ()=>{
  console.log(selectedCity.latitude!==undefined )
  setError(null)
  if(selectedCity.latitude!==undefined && selectedCity.time!==undefined && selectedCity.day!==undefined){
  let url ='';
  if(selectedCity.day!=="custom-date" && Object.keys(selectedCity).length!==0){
     url=`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&past_days=${selectedCity.day}&${selectedCity.time}=temperature_2m,relative_humidity_2m,wind_speed_10m`
  }else if(selectedCity.day==="custom-date"){
    url=`https://archive-api.open-meteo.com/v1/era5?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&start_date=${selectedCity.startDate.toLocaleDateString('en-CA')}&end_date=${selectedCity.endDate.toLocaleDateString('en-CA')}&${selectedCity.time}=temperature_2m&relative_humidity_2m&wind_speed_10m`
  }
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      const data = await response.json()
      throw (data.reason)
    }else if(response.status===200){
      const data = await response.json();
      setResponseData(data);
      setIsgotData(true)
    }
   
  }
  catch (err){
  setError(err);
  setIsgotData(false)
  }
}else{
setError("Please Choose Latitude and Longitude Image and Hourly")
}
 }

  return (
    <>
    <Context.Provider value={[selectedCity,setSelectedCity,responseData]}>
    <div className='max-w-[680px] min-h-[100vh] m-auto border border-red-500 flex flex-col items-center bg-gradient-to-bl from-[#DDC1D1,#86A8E7] to-[#5FFBF1]'>
    <CarouselSize />
    <Timecard />
    <ComboboxDemo />
    <button type="button" className="border bg-[#000000] mt-4 mb-1 px-3 text-[#ffffff] rounded" onClick={handlePostData}>Submit</button>
    {handleError!==null?<p className='text-red-700 text-center'>{handleError}</p>:null}
    {isGotData ?<MainContent response={responseData.hourly} /> :'' }
    
    </div>
    
    {/* {isGotData ? ( <Pagination/>):'' } */}
   
    </Context.Provider>
    </>
  )
}

export default App