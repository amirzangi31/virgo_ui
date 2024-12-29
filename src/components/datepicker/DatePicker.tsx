import React from "react";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css"
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import './DatePicker.css';
export default function Example() {
    
  return (
    <div style={{ direction: "rtl" }}>
      <DatePicker
        inputClass="custom-input"
        className="teal" 
        style={{
          boxSizing: "border-box",
          height: "40px",
          border: "2px #f1f3f0 solid",
          fontSize: "16px",
          textAlign: "center"
        }}
        type="text"
        sort
        showOtherDays
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-left"
        placeholder="YYYY/MM/DD"
       
        
      />
    </div>
  );
}
