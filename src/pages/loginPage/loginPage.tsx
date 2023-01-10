import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/button/Button'
import { Input } from '../../components/input/Input'
import { LinkButton } from '../../components/link/Link'
import { passwordImg } from '../../images/images'
import { emailImg } from '../../images/images'
import "./loginPage.scss"

interface login{
  callBack: Function
}

export const LoginPage = ({callBack}: login) => {
  const [ inputLogin , setInputLogin ] = useState("")
  const [ inputPass  , setInputPass  ] = useState("")
  const [ error      , setError      ] = useState <any[10]>([])
  const navigate = useNavigate()
  const url = process.env.REACT_APP_API

  const login = () =>{
    const loginObj = {
      email    : inputLogin,
      password : inputPass
    }
    fetch(`${url}auth/login`,{
      method  : "POST",
      headers : {
        "Content-Type"  : "application/json",
      },
      body : JSON.stringify(loginObj)
    })
    .then((res)    => res.json())
    .then((result) => {
      if(result.token){
        localStorage.setItem("token", result.token)
        callBack()
        navigate("/help-specification")
      } else {
        if(!result.message){
          setError([result])
          return
        }        
        
        setError([result.message])
      }
    })
  }

  return (
    <div className='containerLogin'>
      <div className='containerLogin__loginBlock'>
        <div className='containerLogin__loginBlock__login'>
          {error.map((value:any)=>(
            <h5>{value}</h5>
          ))}
          <p>Email или номер телефона</p>
          <Input
            value={inputLogin} 
            onChange={setInputLogin}
            img={emailImg.default}
          />
        </div>
        <div className='containerLogin__loginBlock__password'>
          <p>Введите ваш пароль</p>
          <Input 
            value={inputPass} 
            onChange={setInputPass}
            type="password"
            img={passwordImg.default}
          />
        </div>
        <div className='containerLogin__loginBlock__blockAuth'>
            <div className='containerLogin__loginBlock__blockAuth__Button'>
              <Button
                type={5}
                callBack={login}
              >
                <div style={{width:"200px"}}>
                  <p>    Войти    </p>
                </div>
              </Button>
            </div>
            <h1>Еще не аккаунта?</h1>
            <LinkButton
              linkTo='/reg'
              type={3}
            >
              <p>Зарегестрироватся</p>
            </LinkButton>
        </div>
      </div>
    </div>
  )
}
