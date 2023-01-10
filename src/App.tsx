import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Header } from './pages/header/header';
import { TitleList } from './pages/titleList';
import { userSlice } from './store/reducers/UserSlice';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import "./n.scss"
import { PostListPage } from './pages/postListPage/postListPage';
import { RegisterPage } from './pages/registerPage/registerPage';
import { LoginPage } from './pages/loginPage/loginPage';
import { HelpSpecificPage } from './pages/helpSpecificPage/helpSpecificPage';
import { PagePost } from './pages/pageTovar/PagePost';
import { TovarRedactorPage } from './pages/editorRedactorPage/EditorRedactorPage';
import { Loader } from './components/loader/loader';
import { ModalSlice, positionTextModal, typeModal } from './store/reducers/Modal';
import { Modal } from './components/modal/modal';

function App() {
  const {setUser} = userSlice.actions;
  const dispatch = useAppDispatch()
  const url = process.env.REACT_APP_API
  const loader = useAppSelector(state => state.loaderReducer)


  const { setModal }  = ModalSlice.actions;
  

  // const testUser = {
  //   id: Math.random(),
  //   firstName: 'Сухач',
  //   lastName: 'Магомедов',
  //   email: 'gapasilka6@mail.ru',
  //   avatar: "https://sun9-37.userapi.com/s/v1/if2/VxbzEygj3N94a2e7MXGRp5wr4D0DdMl03sif8RtQxWaxLXEi4QxNuBwT2c0SjqC5PZkjEySoFy8-mo4zK0BMFLAI.jpg?size=512x1080&quality=95&type=album"
  // }

  function getUser(){
    fetch(`${url}user/profile`,{
      method  : "GET",
      headers : {
        "Content-Type"  : "application/json",
        "Authorization" : `bearer ${
          localStorage.getItem("token")
        }`
      }
    })
    .then((res)=>res.json())
    .then(async (result)=>{
      if(!result.message){

        result.avatar = `${url}${result.avatar}`

        dispatch(setUser({
          users: [result],
          authorization: true,
          error: 'ok'
        }))

      }
    })
  }

  useEffect(()=>{
    // dispatch(setModal({
    //   active : true,
    //   text   : "test",
    //   type   : typeModal.Default,
    //   positionText : positionTextModal.Center,
    // }))
    
    if(localStorage.getItem("token"))
    {

      getUser()

    } else {

    }
  },[])

  return (
    <div className="App">
      <Router>
        <Header/>
        <Modal/>
        {
          loader.active?
          <Loader/>
          :
          null
        }
        <Routes>
          <Route path='/' element={<TitleList/>}/>
          <Route path='/reg' element={<RegisterPage callBack={getUser}/>}/>
          <Route path='/help-specification' element={<HelpSpecificPage/>}/>
          <Route path='/login' element={<LoginPage  callBack={getUser}/>}/>
          {/* {/posts:id это страница с posts а id это параметр filter} */}
          <Route path='/posts' element={<PostListPage/>}/>
          {/* {/post:id это страница с 1 post } */}
          <Route path='/post/:id' element={<PagePost/>}/>
          <Route path='/redactor-post' element={<TovarRedactorPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
