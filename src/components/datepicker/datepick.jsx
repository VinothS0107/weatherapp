import { useState ,useContext, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Context } from "../../context/useContext"

export function DatePickerWithRange(){
    const [selectedCity,setSelectedCity]=useContext(Context)
   
    return (
      <div className="flex justify-between  rounded-md  max-w-[100%] p-1">
        <div className="flex flex-col justify-between  rounded-md  max-w-[100%]">
        <DatePicker
        dateFormat="yyyy/MM/dd"
          selected={selectedCity.startDate}
          selectsStart
          onChange={(date) => setSelectedCity((prev)=>{return{...prev,startDate:date}})}
          startDate={selectedCity.startDate}
          endDate={selectedCity.endDate}
          maxDate={new Date ()}
          className="w-[100%] bg-transparent border text-center font-semibold rounded-md text-[16px] outline-none "
        />
        <DatePicker
        dateFormat="yyyy/MM/dd"
          selected={selectedCity.endDate}
          onChange={(date) => setSelectedCity((prev)=>{return{...prev,endDate:date}})}
          selectsEnd
          startDate={selectedCity.startDate}
          maxDate={new Date ()}
          endDate={selectedCity.endDate}
          minDate={selectedCity.startDate}
          className="w-[100%] border text-center bg-transparent font-semibold rounded-md text-[16px] outline-none  "
        />
        </div>
      </div>
    );
  }