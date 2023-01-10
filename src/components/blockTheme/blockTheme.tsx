import React,{useState , useEffect} from 'react'
import { Input } from '../input/Input'
import style from "./blockTheme.module.scss"

interface blockTheme {
  cb:React.Dispatch<React.SetStateAction<string>>
}

export const BlockTheme = ({cb}:blockTheme) => {
  const [ theme , setTheme ] = useState("")

  useEffect(()=>{
    cb(theme)
  },[theme])

  return (
    <div className={style.container}>
        <div className={style.container__blockTheme}>
          <Input onChange={(value:string)=>setTheme(value)}/>
        </div>
    </div>
  )
}
