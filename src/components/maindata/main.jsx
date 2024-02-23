import { useContext } from "react"
import { Context } from "../../context/useContext"
import { getSeconds } from  "date-fns";
export function MainContent(){
    const apiData=useContext(Context)[2]
     const temperature=apiData.hourly.temperature_2m
     const time=apiData.hourly.time
    

   let combine=[]
   for(let i=0;i<temperature.length;i++){
        const totalSeconds=getSeconds(new Date(time[i]))        
        console.log(totalSeconds)
        
            // const totalMinutes = Math.floor(totalSeconds / 60);
            // const seconds = totalSeconds % 60;
            // const hours = Math.floor(totalMinutes / 60);
            // const minutes = totalMinutes % 60;
          
            //  console.log({ h: hours, m: minutes, s: seconds })

 }

    return(
        <div className="">Ready to Display Api</div>
    )
}
