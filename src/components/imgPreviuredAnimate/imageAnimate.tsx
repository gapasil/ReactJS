import React, { useState } from 'react'
import  style  from "./imageAnimate.module.scss"

interface imageAnimateType {
    src : string;
    cb? : string;
}

export const ImageAnimate = ({src}:imageAnimateType) => {

  const [ stylesBlock , setStylesBlock ] = useState({})
  const [ stylesImg   , setStylesImg   ] = useState({})
  const [ active      , setActive      ] = useState(false)
  
  const url = process.env.REACT_APP_API

  return (
    <button
      className={style.block} 
      style={stylesBlock}
      onClick={()=>{
        if(active){
          setStylesBlock({})
          setStylesImg({})
          setActive(false)
          return
        }
        setStylesBlock({
          margin:"0px 0px 0px 0px",
          position: "fixed",
          top:"0px",
          left:"0px",
          width:"100%",
          heigth:"100%",
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          zIndex:"100",
          background:"rgba(0, 0, 0, 0.199)"
        })
        setStylesImg({
          width :"500px",
          height:"500px",
          zIndex:"100"
        })
        setActive(true)
      }}
    >
      <div className={style.block__img} style={stylesImg}>
        <img src={`${url}${src}`} className={style.images} style={stylesImg} />
      </div>
    </button>
  )
}
