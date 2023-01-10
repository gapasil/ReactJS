import React from 'react'
import style from "./loader.module.scss"

export const Loader = () => {
  return (
    <div className={style.background}>
        <span className={style.loader}></span>
    </div>
  )
}
