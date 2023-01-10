import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { kata } from '../../../models/Kategories';
import { useAppDispatch } from '../../../hooks/redux';
import "./burger.scss"

interface prop {
    propVisibleBurger:boolean;
    callBack:Function
}

export const Burger = ({propVisibleBurger,callBack}:prop) => {
    const [,set] = useState(0)
    const [visibleBurger,setVisibleBurger] = useState("null")
    const [kategories,setKategories] = useState([
      {name : "Последние опубликованные"},
      {name : "Авторы"},
      {name : "Библиотека"},
      {name : "Словарь"},
      {name : "Еще"},
    ])
    const dispatch = useAppDispatch()
    const [style , setStyle ] = useState({
      "zIndex": 100,
      width: "0",
      height: "100%",
      background: "white",
      display: "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "flex-direction":"column"
    })

    useEffect(()=>{
        if(propVisibleBurger){
          let width = 0
          const stopAnimate = setInterval(()=>{
            const newWidth = width + 5
            width = newWidth

            if(width == 80){clearInterval(stopAnimate)}

            setStyle({
              "zIndex": 100,
              width: `${newWidth}%`,
              height: "100%", 
              background: "white",
              display: "flex",
              "alignItems": "center",
              "justifyContent": "center",
              "flex-direction":"column"
            })
          },10)
          setVisibleBurger("burger")
        }
    },[propVisibleBurger])

    useEffect(()=>{
        if(visibleBurger == "null"){
          callBack()
        }
    },[visibleBurger])

    const reverseAnimate = () =>{
      let width = 80
      const stopAnimate = setInterval(()=>{
        const newWidth = width - 5
        width = newWidth

        if(width == 0){
          clearInterval(stopAnimate)
          setVisibleBurger("null")
        }

        setStyle({
          "zIndex": 100,
          width: `${newWidth}%`,
          height: "100%",
          background: "white",
          display: "flex",
          "alignItems": "center",
          "justifyContent": "center",
          "flex-direction":"column"
        })
        set(Math.random())
      },10)
    }
    const reload = () =>{
      setTimeout(()=>{location.reload()},200)
    }

    return (
      <div 
        className={visibleBurger}
        onClick={reverseAnimate}
      >
        <div style={style}>
          <div className='burger__kategories'>
            <h1>Категорий</h1>
            {kategories.map((value:kata,index)=>{
              return(
                <div className='burger__kategories__podkata' key={index}>
                  <h2>{value.name}</h2>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
}
