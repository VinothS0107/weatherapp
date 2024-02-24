import { useState,useContext, useEffect } from "react"
import { Context } from "../../context/useContext"

import icon from "../../assets/sunny.jpg"




export function MainContent(){
    const apiData=useContext(Context)[2]
    const cityDetails=useContext(Context)[0]
    const[currentValue,setCurrentPage]=useState(0)
    const[endValue,setEndValue]=useState(8)
    const[temperature,setTemperature]=useState([])
    const[time,setTime]=useState([])
    const[chosenPage,setChosenPage]=useState(1)
    const [start,setStart]=useState(1)
    const[end,setEnd]=useState(5)
    const[pageNumber,setPage]=useState([])

    useEffect(()=>{
        const temperature=apiData.hourly.temperature_2m
        const time=apiData.hourly.time
        let combine=[]
        for(let i=0;i<temperature.length;i++){
           combine.push([temperature[i], new Date(time[i]).getHours()])
            }
        const slicedTemperature=temperature.slice(currentValue,endValue)
        const  slicedTime=time.slice(currentValue,endValue)
        let empty=[]
            for(let i=start;i<end;i++){
                empty.push(i)
             }
        setPage(empty)
        setTemperature(slicedTemperature)
        setTime(slicedTime)
        
    },[currentValue,start,end])

    let combine=[]
        for(let i=0;i<temperature.length;i++){
           combine.push([temperature[i], new Date(time[i]).getHours()])
            }
       
        const totalPageNumber=Math.ceil(apiData.hourly.temperature_2m.length/8)
         
        const onPageClick=(event)=>{
            const pageNumber=event.target.value
            const endIndex=pageNumber*8
            const startIndex=endIndex-8
            setCurrentPage(startIndex)
            setEndValue(endIndex)
            setChosenPage(pageNumber)  
        }  
        const getInput=(event)=>{
            if(event.target.name==="increment" && end<=totalPageNumber){
              setEnd(prev=>prev+1)
              setStart(prev=>prev+1)
            }else if(event.target.name==="decrement" && start>1){
              setEnd(prev=>prev-1)
              setStart(prev=>prev-1)
            }
           }  
        
    return(
        <>
              <h1 className="text-[18px] mt-5 font-semibold">City: {cityDetails.city}</h1>
                   <ul className="grid grid-cols-4 gap-3  h-[250px] w-[70%] mt-[30px] justify-items-center content-center list-none">    
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
                <div className="flex justify-center w-[60%] m-[20px] gap-2" >
                    <button type="button" className={start===1?"!text-gray-400 text-[20px]  w-[40px]":"text-[20px] border-2 w-[40px] hover:bg-[#d9f99d]"} disabled={start===1} name="decrement" onClick={getInput}>-</button>
                    <ul className="flex justify-center gap-4" onClick={onPageClick}> 
                        {pageNumber.map((eachPage,index)=>(
                         <li key={index}>
                         <button type="button" value={eachPage} className={`${parseInt(chosenPage)===eachPage?"bg-black border text-[#ffffff]":"bg-transparent"} w-[30px]`}>{eachPage}</button></li>
                             ))}
                    </ul>
                    <button type="button" className={end===totalPageNumber?"!text-gray-400 text-[20px]  w-[40px]":"text-[20px] border-2 w-[40px] hover:bg-[#d9f99d]"} disabled={end===totalPageNumber}  name="increment" onClick={getInput}>+</button>
                </div>
        </>
    )
}
