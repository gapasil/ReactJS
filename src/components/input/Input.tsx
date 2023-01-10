import React , { createRef } from 'react'
import "./input.scss"

interface input {
  img?         : string;
  placeholder? : string;
  onChange?    : Function;
  value?       : string;
  type?        : string;
  ref?         : React.RefObject<HTMLInputElement>;
  maxLength?   : number;
  typeStyle?   : string;
  children?     : any
}

export const Input = ({img, placeholder, onChange, value, type, ref , maxLength , typeStyle , children}:input) => {
  const inputRef:React.RefObject<HTMLInputElement> = createRef();

  if(typeStyle == "1")
  {
    if(onChange){
      return (
        <div className={`CustomInputBlock${typeStyle}`}>
          {children}
          <input
            placeholder={placeholder}
            value={value}
            type={type}
            ref={ref?ref:inputRef}
            maxLength={maxLength?maxLength:10000}
            onChange={(e)=>onChange(e.target.value)}
          />
        </div>
      )
    } else {
      return (
        <div className={`CustomInputBlock${typeStyle}`}>
          {children}
          <input
            placeholder={placeholder}
            type={type}
            ref={ref?ref:inputRef}
            maxLength={maxLength?maxLength:10000}
          />
        </div>
      )
    }
  }
  if(!typeStyle)
  {
    typeStyle = ""
  }
  if(!type){
    type = "text"
  }
  if(!img){
    if(onChange){
      return (
        <div className={`CustomInputBlock${typeStyle}`}>
          <input
            placeholder={placeholder}
            value={value}
            type={type}
            ref={ref?ref:inputRef}
            maxLength={maxLength?maxLength:10000}
            onChange={(e)=>onChange(e.target.value)}
          />
        </div>
      )
    } else {
      return (
        <div className={`CustomInputBlock${typeStyle}`}>
          <input
            placeholder={placeholder}
            type={type}
            ref={ref?ref:inputRef}
            maxLength={maxLength?maxLength:10000}
          />
        </div>
      )
    }
  } else {
    if(onChange){
      return (
        <div className={`CustomInputBlock${typeStyle}`}>
          <img
            src={img}
          />
          <input
            placeholder={placeholder}
            value={value}
            type={type}
            ref={ref?ref:inputRef}
            maxLength={maxLength?maxLength:10000}
            onChange={(e)=>onChange(e.target.value)}
          />
        </div>
      )
    } else {
      return (
        <div className={`CustomInputBlock${typeStyle}`}>
          <img
            src={img}
          />
          <input
            placeholder={placeholder}
            type={type}
            ref={ref?ref:inputRef}
            maxLength={maxLength?maxLength:10000}
          />
        </div>
      )
    }
  }
}
