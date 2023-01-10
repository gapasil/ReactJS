import React, { useEffect, useState } from 'react'
import style from "./containerPost.module.scss"
import { PostModel } from '../../models/post';
import { CartPost } from './cartPost/CartPost'
import { filterPostState } from '../../store/reducers/FilterPost';
import { FilterPost } from './filterPost/filterPost';
import { useAppSelector } from '../../hooks/redux';
import filterPostSlice from '../../store/reducers/FilterPost';

export interface postsViewInt {
  headers:string;
  paragraph:string;
  img?:string;
  views:number;
  date:number;
  _id:string;
  idUser:string;
  theme:string;
}

export const ContainerPost = () => {
  const [ posts, setPosts ] = useState<PostModel[]>([])
  const [ postsView, setPostsView ] = useState<any[]>([])
  const filterPost = useAppSelector(state => state.filterPostReducer)

  const url = process.env.REACT_APP_API

  const getPosts = ():void =>{
    let res = {
      qery:{
        value: 20
      }
    }
    
    fetch("http://localhost:3000/Post/get-Post",{
      method  : "POST",
      headers : {
        "Content-Type"  : "application/json"
      },
      body : JSON.stringify(res)
    })
    .then(response => response.json())
    .then(result => setPosts(result))
  }
  
  useEffect(()=>{
    getPosts()
  },[])

  useEffect(()=>{
    let masPost = []

    if(posts.length > 0)
    for(let keyPost of posts){
      const objPost:postsViewInt = {
        idUser:keyPost.idUser,
        headers:keyPost.headers,
        paragraph:keyPost.paragraph,
        img:keyPost.imageView,
        views:keyPost.views,
        date:keyPost.date,
        _id:keyPost._id,
        theme:keyPost.theme
      }
      masPost.push(objPost)
    }

    setPostsView(masPost)
  },[posts])

  useEffect(()=>{
    console.log(filterPost);
    
    fetch(`${url}Post/get-Post`,{
      method  : "POST",
      headers : {
        "Content-Type"  : "application/json"
      },
      body : JSON.stringify({qery : filterPost})
    })
    .then(response => {
      return response.json()
    })
    .then(result => {

      console.log(result);
      setPostsView([])
      return setPosts(result)
    })
    
  },[filterPost])

  return (
      <div className={style.containerPost}>
        <FilterPost/>
        {postsView?.map((value:postsViewInt)=>{
          return(
            <CartPost
              cb={getPosts}
              headers={value.headers}
              paragraph={value.paragraph}
              img={value.img}
              views={value.views}
              date={value.date}
              _id={value._id}
              key={value._id}
              idUser={value.idUser}
              theme={value.theme}
            />
          )
        })}
        
      </div>
  )
}
