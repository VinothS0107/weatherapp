import { useContext } from "react"
import { Context } from "../../context/useContext"
import icon from "../../assets/sunny.jpg"
export function MainContent(){
    const apiData=useContext(Context)[2]
     const temperature=apiData.hourly.temperature_2m
     const time=apiData.hourly.time
    

   let combine=[]
   for(let i=0;i<temperature.length;i++){
        combine.push([temperature[i], new Date(time[i]).getHours()])
 }
console.log(combine)
    return(
        <div className="grid grid-cols-4 gap-2 sm:w-[80%] mt-[30px] justify-items-center content-center">
            {combine.map((eachItem)=>(
                <>
                    <div className="border rounded-md w-[80px] h-[80px] flex flex-col items-center" >
                        <p>{eachItem[1]}</p>
                        <img src={icon} className="w-[30px] h-[30px]" />
                        <p>{eachItem[0]}<sup>o</sup>C</p>
                        
                    </div>
            </>
                )
            )}

        </div>
    )
}
