import {
    Card,
    CardContent,
   } from "@/components/ui/card"
  import { Checkbox } from "@/components/ui/checkbox"
  import { useContext } from "react"
  import { Context } from "../../context/useContext"

  

 export function Timecard(){
  const [selectedCity,setSelectedCity] =useContext(Context)


  const onChoseTime=(event)=>{
    if(event.target.dataset.state==="unchecked"){
      setSelectedCity((prev)=>({...prev,time:event.target.value}
      ))}else if(event.target.dataset.state==="checked"){
        const {time,...rest}=selectedCity
        setSelectedCity(rest)
      }
  }


  return(
          <>
            <Card className="w-[70%] min-h-[100px] truncate m-4 border-2" >
              <CardContent  className="grid grid-cols-2 gap-5 p-3  content-between text-[20px] ">
                <div className="flex items-center gap-2"  >
                    <Checkbox id="terms" value="hourly" onClick={onChoseTime} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none "
                    >
                      Hourly
                    </label>
                  
                </div>
                <div className="flex items-center gap-2 "  >
                  <Checkbox id="terms1" value="weekly"  disabled />
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  > Weekly
                  </label>
                 
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox id="terms2" value="monthly"  disabled />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >  Monthly
                  </label>
                
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms3" value="yearly"  disabled />
                  <label
                    htmlFor="terms3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  > Yearly
                  </label>
                </div>
              </CardContent>
            </Card>
          </>
    )
  }
