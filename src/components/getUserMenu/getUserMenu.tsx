import React, { ChangeEvent,useState } from 'react'
import { useAppSelector } from '../../hooks/redux';
import { User } from '../../models/User';
import style from "./getUserMenu.module.scss"

interface prop {
    cbUser: (IdUser: string) => void
}

export const GetUserMenu = ({cbUser}:prop) => {
  let isCooldown = false;
  const url = process.env.REACT_APP_API
  const user = useAppSelector(state => state.userReducer)
  const [ messageStatus , setStatus ] = useState("")
  const [ classBlockUsers , setClassBlockUsers ] = useState(style.none)
  const [ users , setUsers ] = useState([])

  const focusInput = () =>{
    setClassBlockUsers(style.none)
  }

  const getUserFetch = (name:string) =>{

    fetch(`${url}user/getUserNameLastName`,{
        method  : "POST",
        headers : {
          "Content-Type"  : "application/json",
          "Authorization" : `bearer ${
            localStorage.getItem("token")
          }`
        },
        body : JSON.stringify({name:name})
    })
    .then((res)=>{
        return res.json()
    })
    .then((result)=>{
        if(result.message)
        {
            
            setStatus(result.message)
            setUsers([])

        } else if(result)
        {
             
            setStatus("")
            setUsers(result)

        }
        
    })
  }
  
  const getUserDecorator = (e:ChangeEvent<HTMLInputElement>) =>{
    setClassBlockUsers(style.container__containerUser)

    if (isCooldown){
        return setStatus("Загрузка...")
    };
  
    getUserFetch(e.target.value)
  
    isCooldown = true;
  
    setTimeout(() => {
        isCooldown = false
        getUserFetch(e.target.value)
    } 
    , 2000);
  }

  if(user.authorization){
    return (
      <div className={style.container}>
          <div className={style.container__inputBlock}>
              <input
                placeholder='Введите имя автора'
                onBlur={focusInput}
                onChange={getUserDecorator}
              />
          </div>
          <div className={classBlockUsers}>
            {users.map((value:User)=>{

                return(
                    <div 
                      className={style.container__containerUser__blockUser}
                      onClick={()=>cbUser(value._id)}
                    >
                        <img src={`${url}${value.avatar}`}/>
                        <p>{value.firstName}</p>
                        <p>{value.lastName}</p>
                    </div>
                )

            })}
            <div>
              <p>{messageStatus}</p>
            </div>
          </div>
      </div>
    )
  } else {
    return (
        <div className={style.none}>
        </div>
      )
  }
}
