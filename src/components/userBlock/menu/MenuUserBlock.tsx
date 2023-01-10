import React,{useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { menuUserSlice } from '../../../store/reducers/MenuUser';
import  setting  from "../../../images/setting.png"
import  exit  from "../../../images/exit.png"
import styles  from './styleMenu.module.scss';

export const MenuUserBlock = () => {

  const focusMenu = useRef<HTMLDivElement>(null);
  const { ActiveMenuUser , UnActiveMenuUser } = menuUserSlice.actions;
  const activeMenu = useAppSelector(state => state.menuUserReducer)
  const user = useAppSelector(state => state.userReducer)

  const dispatch = useAppDispatch()

  useEffect(()=>{
    if(activeMenu.active && focusMenu.current != null)
    {
      focusMenu.current.focus()
    }
  },[activeMenu])

  if(activeMenu.active)
  {
    return (
      <div className={styles.containerMenu} ref={focusMenu} onBlur={()=>dispatch(UnActiveMenuUser())} tabIndex={0}>
        <div className={styles.containerMenu__containerlink}>
          {/* <Link to="/" className={styles.containerMenu__containerlink__logo}>
            <img src='https://i.pinimg.com/736x/e9/e2/78/e9e2787d0cb55d570fe1c76843506759.jpg' width="100%"/>
          </Link> */}
          <Link to="/" className={styles.userBlock}>
            <img src={user.users[0].avatar} alt="" style={{width : "45px"}}/>
            <p>{user.users[0].firstName}</p>
            <p>{user.users[0].lastName}</p>
          </Link>
          <Link to="/setting">
            <img src={setting}/>
            <p>Настроики</p>
          </Link>
          <button onClick={()=>{window.location.reload();localStorage.setItem("token","")}}>
            <img src={exit}/>
            <p>Выйти из аккаунта</p>
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div>

      </div>
    )
  }
}
