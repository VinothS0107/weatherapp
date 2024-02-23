import { useState,useContext, useEffect } from "react"
import { Context } from "../../context/useContext"
import icon from "../../assets/sunny.jpg"


export function MainContent(){
    const apiData=useContext(Context)[2]
    const cityDetails=useContext(Context)[0]
    const [currentValue,setCurrentPage]=useState(0)
    const[endValue,setEndValue]=useState(8)
    const[temperature,setTemperature]=useState([])
    const[time,setTime]=useState([])
    const[chosenPage,setChosenPage]=useState(1)

    useEffect(()=>{
        const temperature=apiData.hourly.temperature_2m
        const time=apiData.hourly.time
        
        let combine=[]
        for(let i=0;i<temperature.length;i++){
           combine.push([temperature[i], new Date(time[i]).getHours()])
            }
         const slicedTemperature=temperature.slice(currentValue,endValue)
         const  slicedTime=time.slice(currentValue,endValue)
        // setTotalPage((prev)=>[...prev,...combine],[setTotalPage])
        setTemperature(slicedTemperature)
        setTime(slicedTime)
        
        // const totalitem=currentPage+totalItemInSinglePage
        // const sliceItem=combine.slice(currentPage,totalItemInSinglePage)
        // setCurrentPage(totalItemInSinglePage)
        // setTotalItemInSinglePage(totalItemInSinglePage)
        // console.log(sliceItem)
    },[currentValue])

    let combine=[]
        for(let i=0;i<temperature.length;i++){
           combine.push([temperature[i], new Date(time[i]).getHours()])
            }
       
        const totalPageNumber=Math.ceil(apiData.hourly.temperature_2m.length/8)
         let arrayOfPageNumber=[]
            for(let initial=1;initial<totalPageNumber+1;initial++){
                  arrayOfPageNumber.push(initial)
            }

        const onPageClick=(event)=>{
            const pageNumber=event.target.value
            const endIndex=pageNumber*8
            const startIndex=endIndex-8
            setCurrentPage(startIndex)
            setEndValue(endIndex)
            setChosenPage(pageNumber)  
        }    
        
    return(
        <>
              <h1 className="text-[18px] mt-5 font-semibold">City: {cityDetails.city}</h1>
                   <ul className="grid grid-cols-4 gap-2  h-[250px] mt-[30px] justify-items-center content-center list-none">    
                        {combine.map((eachItem,inx)=>{
                            function dateConversion(hours){
                                const indianTime=hours<12?hours:hours-12;
                                return hours<12?`${indianTime}:00 AM`:`${indianTime}:00 PM`
                            }
                            return(
                                <li key={inx} className="border rounded-md w-[fill] h-[120px] flex flex-col items-center text-[14px] justify-evenly" >
                                    <p>{dateConversion(eachItem[1])}</p>
                                    <img src={icon} className="w-[40px] h-[40px]" />
                                    <p>{eachItem[0]}<sup>o</sup>C</p>        
                                </li>
                        )})}
                    </ul> 
                    <ul className="list-none flex justify-center items-center white m-[30px] border w-[100%]" onClick={onPageClick}>
                    {arrayOfPageNumber.map((each,index)=>(
                            <li key={index}  >
                                <button type="button" className={`${parseInt(chosenPage)===each?"bg-black border text-[#ffffff]":"bg-transparent"} w-[30px]`} value={each} >{each}</button>
                            </li>
                    ))}
                    </ul>

        </>
    )
}
