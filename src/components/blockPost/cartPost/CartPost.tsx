import React,{useState,useEffect} from 'react'
import style from './cart.module.scss'
import { LinkButton } from '../../link/Link'
import { User } from '../../../models/User'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { ModalSlice, positionTextModal, typeModal } from '../../../store/reducers/Modal'
import  X  from "../../../images/крестик.png"

export interface props {
  headers:string;
  paragraph:string;
  img?:string;
  views:number;
  date:number;
  _id:string;
  idUser:string;
  theme:string;
  cb:() => void
}

export const CartPost = ({headers, paragraph, img, views, date, _id, idUser, theme, cb}:props) => {
  const [ userPost , setUserPost ] = useState<User>()
  const [ selectUser , setSelectUser ] = useState<boolean>()
  const url = process.env.REACT_APP_API

  const user = useAppSelector(state => state.userReducer)
  const { setModal }  = ModalSlice.actions;
  const dispatch = useAppDispatch()

  useEffect(()=>{

    fetch(`${url}user/getUserId`,{
      method  : "POST",
      headers : {
        "Content-Type"  : "application/json",
        "Authorization" : `bearer ${localStorage.getItem("token")}`
      },
      body : JSON.stringify({id: idUser})
    })
    .then(response => {
      return response.json()
    }
    )
    .then(result => {
      setUserPost(result)
    })
    
  },[])

  const deletePost = () =>{
    dispatch(setModal({
      active : true,
      text   : "Вы уверены что хотите удалить эту статью?",
      type   : typeModal.Select,
      state  : setSelectUser,
      positionText : positionTextModal.Center
    }))
  }

  useEffect(()=>{
    console.log(selectUser);
    
    if(selectUser)
    {
      fetch(`${url}Post/deletePost`,{
        method  : "POST",
        headers : {
          "Content-Type"  : "application/json",
          "Authorization" : `bearer ${localStorage.getItem("token")}`
        },
        body : JSON.stringify({id: _id})
      })
      .then(response => response.json())
      .then(result => {
  
        if(result.acknowledged)
        {
  
          dispatch(setModal({
            active : true,
            text   : "Пост удален",
            type   : typeModal.Default,
            positionText : positionTextModal.Center
          }))
          cb()
  
        } else {
  
          dispatch(setModal({
            active : true,
            text   : "Не удалось удалить пост",
            type   : typeModal.Default,
            positionText : positionTextModal.Center
          }))
  
        }
      })
    }
  },[selectUser])

  if(userPost)
  {
    return (
      <div className={style.block}>
        {user.users[0]?.role[0] == "admin" || user.users[0]?.role[1] == "moder"?
          <div className={style.X}>
            <img
              onClick={deletePost}
              src={X}
            />
          </div>
          :
          <div>

          </div>
        }
        <div className={style.cartPost}>
          <div className={style.cartPost__cartTop}>
            <div className={style.cartPost__cartTop__blockLeft}>
              <img src={`${url}${userPost?.avatar}`} alt="" />
  
              <div className={style.cartPost__cartTop__flnameandTime}>
                <div className={style.cartPost__cartTop__flnameandTime__flname}>
  
                  <p>{userPost?.firstName}</p>
                  <p>{userPost?.lastName}</p>
  
                </div>
                <div className={style.cartPost__cartTop__flnameandTime__timeAndAddUser}>
                  <p>{new Date(Number(date)).toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
  
              </div>
            </div>
            <div className={style.cartPost__cartTop__blockRight}>
              <p>{theme}</p>
            </div>
  
          </div>
          <h1>{headers}</h1>
          <p dangerouslySetInnerHTML={{__html:paragraph}}>{}</p>
          <img src={`${url}${img}`}/>
          <div className={style.cartPost__cartButton}>
            <LinkButton
              linkTo={`/post/${_id}`}
              type={2}
            >
              <p>Читать далее →</p>
            </LinkButton>
          </div>
          <div className={style.cartPost__cartFooter}>
  
            {/* <div className={style.cartPost__cartFooter__likeAndComment}>
              <p>10</p>
              <p>50</p>
            </div> */}
  
            <p>{views} просмотров</p>
  
          </div>
        </div>
      </div>
    ) 
  } else {
    return(
      <div>
        
      </div>
    )
  }
}

