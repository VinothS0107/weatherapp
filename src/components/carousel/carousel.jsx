import { useContext } from "react"
import { Context } from "../../context/useContext"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import chennai from "../../assets/chennai1.png"
import madurai from "../../assets/weather1.png"
import trichy from "../../assets/weather2.jpg"
import tirunelveli from "../../assets/heat.jfif"

const dummyData=[{
    id:1,
    city:"Chennai",
    latitude:13.04,
    longitude:80.17,
    imageUrl:chennai,

},
{
    id:2,
    city:"Madurai",
    latitude:9.939093,
    longitude:78.121719,
    imageUrl:madurai,

},
{
    id:3,
    city:"Trichy",
    latitude:10.7905,
    longitude:78.7047,
    imageUrl:trichy,

},
{
    id:4,
    city:"Tirunelveli",
    latitude:8.7150,
    longitude:77.7656,
    imageUrl:tirunelveli,

},]
export function CarouselSize() {
    const value=useContext(Context);
   const [selectedCity,setSelectedCity]=value

    const onClickImage=(id)=>{
        const cityList=dummyData.find((eachDummyData)=>eachDummyData.id===id)
        setSelectedCity((prev)=>{return{...prev,...cityList}})
    }

    const showLatandLong=()=>{
        return(
            <div className="block mt-[20px] mb-[20px] flex justify-between gap-2 sm:w-[60%] md:w-[70%] font-semibold text-[18px]">
                <p className="w-[50%] border rounded-md  p-2">Latitude:{selectedCity.latitude}</p>
                <p className="w-[50%] border rounded-md p-2">Longitude:{selectedCity.longitude}</p>
            </div>
        )
    }

  return (<>
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[70%]  rounded-2 mt-[30px]"
    >
      <CarouselContent>
        {dummyData.map((eachCity, index) =>(
          <CarouselItem key={index} className="max-h-[300px]">
            <div className="h-[100%]">
                  <img src={eachCity.imageUrl} className="w-[100%] h-[100%] rounded-[10px] cursor-pointer" onClick={()=>onClickImage(eachCity.id)}/>
            </div>
          </CarouselItem>)
)}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    {(Object.keys(selectedCity).every((each)=>(each!=="latitude"))) ?null:showLatandLong()}
    
    </>
  )
}
