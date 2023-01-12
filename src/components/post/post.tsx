import React, { useEffect, useState } from 'react'
import { User } from "../../models/User"
import styles  from "./post.module.scss"
import { PostModel } from '../../models/post'
import EditorJS from '@editorjs/editorjs';
import configuration from '../TextEditor/configuration'

export const Post = () => {
  const [ post , setpost ] = useState<PostModel[]>()
  const [ err   , setErr   ] = useState(false) 
  const [ user  , setUser  ] = useState<User>()

  let editor
  const url = process.env.REACT_APP_API

  if(post){
    fetch(`${url}${post[0].file}`)
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);
      
      editor = new EditorJS(configuration("view",result));
    })
  } 

  useEffect(()=>{
    ///извлекаем id posta из url
    let idMass = []

    for (let index = 0; index < window.location.pathname.length; index++) {
      if(index >= 6){
        idMass.push(window.location.pathname[index])
      }
    }

    
    const idPost = idMass.join("");
    
    fetch(`${url}Post/get-PostID`,{
      method  : "POST",
      headers : {
        "Content-Type"  : "application/json",
        "Authorization" : `bearer ${localStorage.getItem("token")}`
      },
      body : JSON.stringify({_id: idPost})
    })
    .then(response => {
      if(response.statusText == "Unauthorized"){
        setErr(true)
        return
      }
      return response.json()
    }
    )
    .then(result => setpost(result))

  },[])

  useEffect(()=>{
    if(post){
      fetch(`${url}user/getUserId`,{
        method  : "POST",
        headers : {
          "Content-Type"  : "application/json",
          "Authorization" : `bearer ${localStorage.getItem("token")}`
        },
        body : JSON.stringify({id: post[0].idUser})
      })
      .then(response => {
        if(response.statusText == "Unauthorized"){
          setErr(true)
          return
        }
        return response.json()
      }
      )
      .then(result => setUser(result))
    }
  },[post])

  // useEffect(()=>{
  //   console.log(`ЮЗЕР ПОСТА : `);
  //   console.log(user);
  // },[user])

  if(err){
    return (
      <div>
        <h1>Авторизуйтесь</h1>
      </div>
    )
  } else {
    if(post && user){
      return (
        <div className={styles.container}>
          <div className={styles.container__ContainerHead}>
            <div className={styles.container__ContainerHead__blockHead}>
              <div className={styles.container__ContainerHead__blockHead__leftBlock}>
                <div className={styles.container__ContainerHead__blockHead__leftBlock__img}>
                    <img
                      className={styles.buttonUser__img}
                      src={`${url}${user.avatar}`}
                    />
                </div>
                <p>{user.firstName}    {user.lastName}</p>
              </div>
              <div className={styles.container__ContainerHead__blockHead__rightBlock}>
                <p>{post[0].theme}</p>
              </div>
            </div>
          </div>

          <div className={styles.header}>
            <h1>{post[0].headers}</h1>
          </div>
          {/* <p>{new Date(Number(post[0].date)).toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p>{`${post[0].views} просмотров`}</p> */}
          <div id="editorjs"></div>
        </div>
      )
    } else {
      return(
        <div>
  
        </div>
      )
    }
  }
}
