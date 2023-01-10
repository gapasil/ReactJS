import React from 'react'
import style from "./date.module.scss"
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'antd/dist/antd.css'

interface cb {
  cb: (min: any, max: any) => void
}

export const DateFilter = ({cb}:cb) => {
  return (
    <div className={style.datePostFilter}>
      <DatePicker
        locale={locale}
        placeholder="От" 
        onChange={(e:any)=>{
            cb(
              e._d.getTime(),
              false,
            )
        }}
      />
      <DatePicker
        locale={locale}
        placeholder="До" 
        onChange={(e:any)=>{
            cb(
              false,
              e._d.getTime()
            )
        }}
      />
    </div>
  )
}
