import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { MenuUserBlock } from './menu/MenuUserBlock'
import Notification from "../../images/notification.svg"
import style from "./userBlock.module.scss"
import { menuUserSlice } from '../../store/reducers/MenuUser'

export const UserBlock = () => {
  const user = useAppSelector(state => state.userReducer)

  const activeMenu = useAppSelector(state => state.menuUserReducer)

  const { ActiveMenuUser , UnActiveMenuUser } = menuUserSlice.actions;
  const dispatch = useAppDispatch()


  useEffect(()=>{
    console.log(user.users);
  },[])

  if(user.authorization){
     return (
      <div className={style.blockUser}>
        <Link to="/">
          <Notification/>
        </Link>
        <button
          onClick={()=>{
            dispatch(ActiveMenuUser())
          }}
          className={style.buttonUser}
        >
          <img
            className={style.buttonUser__img}
            src={user.users[0].avatar}
          />
        </button>          
        <MenuUserBlock/>
      </div>

    )   
  } else {
    return (
      <button>
      </button>
    )   
  }

}
