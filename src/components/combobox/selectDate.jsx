import { useState ,useContext} from "react";
import { DatePickerWithRange } from "../datepicker/datepick";
import { Context } from "../../context/useContext"

const frameworks = [
  {
    value:1,
    label:"1 days",
  },
  {
    value: 2,
    label:"2 days",
  },
  {
    value: 3,
    label:"3 days",
  },
  {
    value:4,
    label:"4 days"
  },
  {
    value: "custom-date",
    label:"Custom Date",
  },
]

export function ComboboxDemo() {
  const[selectedCity,setSelectedCity]=useContext(Context)
   const [value, setValue] = useState(1)

const onSelectedDays=(event)=>{
const day= event.target.value
setSelectedCity((prev)=>{return {...prev,day}})
}
const showStartEndDate=()=>{
  return(
    <div className="max-w-[100%] text-center m-5 border-2 flex flex-col">
      <DatePickerWithRange />
    </div>
  )
}

const showPastDate=()=>{
  return(
    <div className="max-w-[100%] text-center m-5 border-2 flex flex-col rounded ">
        <select onChange={onSelectedDays} name="selectDate" className="outline-none" >
          <option defaultValue value="">Choose Date</option>
          {frameworks.map((each)=>(
            <option key={each.value}  value={each.value}>{each.label}</option>
          ))}
            
        </select>
    </div>
  )
}

  return (<>
    {"custom-date"===selectedCity.day?showStartEndDate():showPastDate()}
    </> 
  )
}
