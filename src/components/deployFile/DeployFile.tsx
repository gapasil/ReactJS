import React, { ChangeEvent, useEffect, useState } from 'react'
import img from "../../images/1784.png"
import "./deployFile.scss"

interface deploy {
  callBack : Function,
  text : string,
  multiple?: boolean
}

export const DeployFile  = ({callBack, text, multiple}: deploy) => {
  const [ file , setFile ] = useState <ChangeEvent<HTMLInputElement>>()

  useEffect(()=>{
    if(file){
      callBack(file)
    }
  },[file])
   
  if(multiple){
    return (
      <div className="input__wrapper">
        <input 
          type="file" 
          id="input__file" 
          className="input input__file" 
          onChange={(e)=>{setFile(e)}}
          multiple
        /> 
      <label  className="input__file-button">
        <span className="input__file-icon-wrapper">
          <img className="input__file-icon" src={img} width="35"/>
        </span>
        <span className="input__file-button-text">
          {text}
        </span>
      </label>
    </div>
    )
  }

  return (
    <div className="input__wrapper">
      <input 
        type="file" 
        id="input__file" 
        className="input input__file" 
        onChange={(e)=>{setFile(e)}}
      /> 
    <label  className="input__file-button">
      <span className="input__file-icon-wrapper">
        <img className="input__file-icon" src={img} width="35"/>
      </span>
      <span className="input__file-button-text">
        {text}
      </span>
    </label>
  </div>
  )
}
