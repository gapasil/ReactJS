import React, { useEffect, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/button/Button'
import { DeployFile } from '../../components/deployFile/DeployFile'
import { Input } from '../../components/input/Input'
import { useAppDispatch } from '../../hooks/redux'
import { passwordImg } from '../../images/images'
import { emailImg } from '../../images/images'
import { ModalSlice, positionTextModal, typeModal } from '../../store/reducers/Modal'
import { LoaderSlice } from '../../store/reducers/Loader';
import "./register.scss"

interface reg{
  callBack: Function
}

export const RegisterPage = ({callBack}:reg) => {

  const [ inputLogin , setInputLogin ] = useState("")
  const [ inputPass  , setInputPass  ] = useState("")
  const [ firstName  , setFirstName  ] = useState("")
  const [ lastName   , setLastName   ] = useState("")
  const [ avatarUser , setAvatarUser ] = useState <File>()
  const [ imagePreview , setImagePreview ] = useState<null|string>(null)

  const navigate = useNavigate()
  const url = process.env.REACT_APP_API
  
  const { setModal }  = ModalSlice.actions;
  const { ActiveLoader , UnActiveLoader } = LoaderSlice.actions;
  const dispatch = useAppDispatch()
  
  const setImagePreviured = (e: ChangeEvent) =>{
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    setAvatarUser(file)

    let reader = new FileReader()

    reader.onload = function() {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file)
  }

  const registration = async () =>{
    const formData = new FormData()

    if(avatarUser){
      formData.append("avatar", avatarUser)
    }

    formData.append("email", inputLogin)
    formData.append("password", inputPass)
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)

    dispatch(ActiveLoader())

    fetch(`${url}auth/registration`,{
      method  : "POST",
      body : formData 
    })
    .then((res)    => res.json())
    .then((result) => {

      dispatch(UnActiveLoader())
      dispatch(setModal({
        active : true,
        text   : result.message,
        type   : typeModal.Default,
        positionText : positionTextModal.Center,
      }))

      localStorage.setItem("token", result.token)
      callBack()
      navigate("/")
    })
  }
  
  
  // const inputValueLogin = (value: string) =>{
  //   if(value.length > 30){
  //     setInputLogin(inputLogin)
  //   } else {
  //     setInputLogin(value)
  //   }
  // }

  // const inputValuePass  = (value: string) =>{
  //   if(value.length > 16){
  //     setInputPass(inputPass)
  //   } else {
  //     setInputPass(value)
  //   }
  // }

  return (
    <div className='containerReg'>
      <div className='containerReg__blockInput'>
        <div className='containerReg__blockInput__firstName'> 
          <p>Имя пользователя</p>
          <Input 
            value={firstName} 
            onChange={setFirstName}
          />
        </div>
        <div className='containerReg__blockInput__lastName'>
          <p>Фамилия пользователя</p>
          <Input 
            value={lastName} 
            onChange={setLastName}
          />
        </div>
        <div className='containerReg__blockInput__login'>
          <p>Email или номер телефона</p>
          <Input 
            value={inputLogin} 
            onChange={setInputLogin}
            img={emailImg.default}
          />
        </div>
        <div className='containerReg__blockInput__password'>
          <p>Придумайте пароль:</p>
          <Input 
            value={inputPass} 
            onChange={setInputPass}
            img={passwordImg.default}
          />
          <p>Длинна пароля не меньше 4 и не больше 16</p>
        </div>
        <div className='containerReg__blockInput__buttonReg'>
          {imagePreview?
            <img
              className='containerReg__blockInput__buttonReg__imgPreviy'
              src={imagePreview}
            />          
            :
            null
          }
          <div className='containerReg__blockInput__buttonReg__button'>
            <DeployFile
              callBack={setImagePreviured}
              text={"Выберите аватар"}
            />
            <div style={{marginTop: "100px"}}>
              <Button
                type={1}
                callBack={registration}
              >
                <p>Зарегестрироватся</p>
              </Button>
            </div>
          </div>
        </div>    
      </div>
    </div>
  )
}
