import React, { ChangeEvent,useState,useEffect } from 'react'
import { useAppSelector } from '../../../../../hooks/redux';
import { User } from '../../../../../models/User';
import style from "./getUserMenu.module.scss"

interface prop {
    cbUser: (IdUser: string) => void
}

export const GetUserMenu = ({cbUser}:prop) => {
  let isCooldown = false;
  const url = process.env.REACT_APP_API
  const user = useAppSelector(state => state.userReducer)
  const [ messageStatus , setStatus ] = useState("")
  const [ users , setUsers ] = useState<Array<User>>()

  useEffect(()=>{
    fetch(`${url}user/getAuthor`)
    .then((res)=>res.json())
    .then((result)=>{
      setUsers(result)
    })
  },[])

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

        } else if(result)
        {
             
            setStatus("")
            setUsers(result)

        }
        
    })
  }
  
  const getUserDecorator = (e:ChangeEvent<HTMLInputElement>) =>{
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

    return (
      <div className={style.container}>
          <div className={style.container__inputBlock}>
              <input
                placeholder='Введите имя автора'
                onChange={getUserDecorator}
              />
          </div>
          <div className={style.container__containerUser}>
            {users?.map((value:User)=>{      
                return(
                    <div 
                      className={style.container__containerUser__blockUser}
                      onClick={()=>cbUser(value._id)}
                      key={Math.random()}
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
}
