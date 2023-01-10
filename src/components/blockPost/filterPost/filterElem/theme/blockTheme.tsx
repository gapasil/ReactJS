import React,{useState , useEffect} from 'react'
import { Button } from '../../../../button/Button'
import { Input } from '../../../../input/Input'
import style from "./blockTheme.module.scss"

interface blockTheme {
  cb:React.Dispatch<React.SetStateAction<string|boolean>>
}

export const BlockTheme = ({cb}:blockTheme) => {
  const [ theme , setTheme ] = useState<string|boolean>("")

  useEffect(()=>{
    cb(theme)
  },[theme])

  return (
    <div className={style.container}>
        <div className={style.container__blockTheme}>
          <Input onChange={(value:string)=>setTheme(value)} placeholder="Введите название темы"/>
        </div>
        <Button
          type={3}
          callBack={()=>setTheme(false)}
        >
          <p>Убрать</p>
        </Button>
    </div>
  )
}
