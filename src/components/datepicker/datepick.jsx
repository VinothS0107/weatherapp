import { useState ,useContext, useEffect} from "react";
import DatePicker from "react-datepicker";
import {format } from "date-fns"
import "react-datepicker/dist/react-datepicker.css";
import { Context } from "../../context/useContext"

export function DatePickerWithRange(){
    const [selectedCity,setSelectedCity]=useContext(Context)
   
    return (
      <div className="flex justify-between border-none max-w-[100%]">
        <DatePicker
        dateFormat="yyyy/MM/dd"
          selected={selectedCity.startDate}
          selectsStart
          onChange={(date) => setSelectedCity((prev)=>{return{...prev,startDate:date}})}
          startDate={selectedCity.startDate}
          endDate={selectedCity.endDate}
          maxDate={new Date ()}
          className="w-[100%] bg-transparent font-bold  text-[18px] outline-none border-r-4"
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
          className="w-[100%] bg-transparent font-bold  text-[18px] outline-none ml-2"
        />
      </div>
    );
  }