import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
//import { User } from '../../models/User'
import { Input } from '../../components/input/Input'
import "./header.scss"
import { UserBlock } from '../../components/userBlock/UserBlock'
import { Link } from 'react-router-dom'
//import { setingImg } from "./img/images"
import { userImg } from "./img/images"
// import { plusImg } from "./img/images"
// import { searchImg } from "./img/images"
// import { burgerImg } from "./img/images"
// import { Burger } from './burger/burger'
// import { MenuHeader } from './menu/menuHeader'
// import { Button } from '../../components/button/Button'
import { LinkButton } from '../../components/link/Link'
import  Logo  from "../../images/logo.svg"
import  AddImg from "../../images/add.svg"
import  BurgerIcon from "../../images/burger.svg"
import  Search from "../../images/search.svg"
import {burgerSlice} from '../../store/reducers/Burger';

export const Header = () => {
  // const [visibleBurger, setVisibleBurger] = useState(false)
  // const [visibleMain, setVisibleMain] = useState(false)

  const { ActiveBurger, UnActiveBurger } = burgerSlice.actions;
  const dispatch = useAppDispatch()

  const burgerState = useAppSelector(state => state.burgerReducer)
  const user = useAppSelector(state => state.userReducer)

  // //бургер меню в мобильной версий меньше 860px
  // const callBackBurger = () =>{
  //   setVisibleBurger(false)
  // }

  // //меню под экраны больше 860px
  // const callBackMain = () =>{
  //   setVisibleMain(false)
  // } 

  
  if(user.authorization){
    return (
      <div className='Header'>
        <div className='Header__blockLeft'>
          <button 
            onClick={()=>{
              dispatch(burgerState.active? UnActiveBurger() : ActiveBurger())
            }}
            style={{height:"22px"}}
          >
            <BurgerIcon/>
          </button>
          <Link
            to={"/"}
            style={{zIndex:100,display:"flex",alignItems:"center"}}
          >
            <Logo/>
          </Link>
        </div>
        <div className='Header__containerCenter'>
          <div className='Header__containerCenter__center'>
            {/* <Input typeStyle='1' placeholder='Поиск'>
              <Search/>
            </Input> */}
            <LinkButton
              type={3}
              linkTo={"/redactor-post"}
            >
              <div style={{height:"28px",display:"flex",alignItems:"center"}}>
                <AddImg/>
              </div>
              <p>ПУБЛИКАЦИЯ</p>
            </LinkButton>

            <div className='Header__containerCenter__center__blockUser'>
              <UserBlock/>
            </div>
          </div>
        </div>
      </div>
    ) 
  } else {
    return (
      <div className='Header'>
      <div className='Header__blockLeft'>
        <button 
          onClick={()=>{
            dispatch(burgerState.active? UnActiveBurger() : ActiveBurger())
          }}
          style={{height:"22px"}}
        >
          <BurgerIcon/>
        </button>
        <Link
          to={"/"}
          style={{zIndex:100,display:"flex",alignItems:"center"}}
        >
          <Logo/>
        </Link>
      </div>
      <div className='Header__containerCenter'>
        <div className='Header__containerCenter__center'>
          {/* <Input typeStyle='1' placeholder='Поиск'>
            <Search/>
          </Input> */}
          <LinkButton
            type={3}
            linkTo={"/login"}
          >
            <div style={{height:"28px",display:"flex",alignItems:"center"}}>
              <AddImg/>
            </div>
            <p>ПУБЛИКАЦИЯ</p>
          </LinkButton>

          <div className='Header__containerCenter__center__blockUserDefault'>
            <Link to="/login">
              <img 
                src={userImg.default}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
    ) 
  }
}
