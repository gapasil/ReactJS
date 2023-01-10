import React, { ChangeEvent, useEffect, useState } from 'react'
import Icon from "./icon.svg"
import "./buttonBackgroundPost.scss"

interface deploy {
  callBack : Function,
  text : string,
  multiple?: boolean
}

export const ButtonBackgroundPost  = ({callBack, text, multiple}: deploy) => {
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
        <Icon/>
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
        <Icon/>
  </div>
  )
}
