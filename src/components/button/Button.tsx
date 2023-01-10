import React from 'react'
import "./button.scss"

interface Button{
    children?: React.ReactElement | null,
    props? :    string,
    callBack? : Function,
    type : number,
    active?: boolean
}
export const Button = ({children, props, callBack, type , active}: Button) => {

  if(callBack){
    return (
        <button 
          onClick={()=>callBack()}
          className={active?`button${type}active`:`button${type}`}
        >
          {children}
        </button>
    )
  } else {
    return (
        <button 
          className={active?`button${type}active`:`button${type}`}
        >
          {children}
        </button>
    )
  }
}
