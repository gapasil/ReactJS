import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { kata } from '../../../models/Kategories';
import { useAppDispatch } from '../../../hooks/redux';
import "./menuHeader.scss"

interface prop {
    propVisibleBurger:boolean;
    callBack:Function
}
export const MenuHeader = ({propVisibleBurger,callBack}:prop) => {
    const [,set] = useState(0)
    const [visibleBurger,setVisibleBurger] = useState("null")
    const [kategories,setKategories] = useState([
      {name : "Последние опубликованные"},
      {name : "Авторы"},
      {name : "Библиотека"},
      {name : "Словарь"},
      {name : "Еще"},
    ])
    const [podKategoriesList,setPodKategoriesList] = useState([""])
    const dispatch = useAppDispatch()
    const [style , setStyle ] = useState({
      "zIndex": 100,
      width: "0",
      height: "100%",
      background: "white",
      display: "flex",
      "justifyContent": "space-between",
    })

    useEffect(()=>{
        if(propVisibleBurger){
          let width = 0
          const stopAnimate = setInterval(()=>{
            const newWidth = width + 15
            width = newWidth

            if(width == 300){clearInterval(stopAnimate)}

            setStyle({
              "zIndex": 100,
              width: `${newWidth}px`,
              height: "100%", 
              background: "white",
              display: "flex",
              "justifyContent": "space-between",
            })
          },10)
          setVisibleBurger("mainHeader")
        }
    },[propVisibleBurger])

    useEffect(()=>{
        if(visibleBurger == "null"){
          callBack()
        }
    },[visibleBurger])

    // const setKategoriesBlock = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>{
    //     const target = e.target as HTMLElement
    //     let key:kata
    
    //     for(key of kategories){
    //         if(key.name == target.innerText){
                
    //           setPodKategoriesList(key.ka);
                
    //         }
    //     }
    // }

    const reverseAnimate = () =>{
      let width = 300
      const stopAnimate = setInterval(()=>{
        const newWidth = width - 15
        width = newWidth

        if(width == 0){
          clearInterval(stopAnimate)
          setVisibleBurger("null")
        }

        setStyle({
          "zIndex": 100,
          width: `${newWidth}px`,
          height: "100%",
          background: "white",
          display: "flex",
          "justifyContent": "space-between",
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
          <div className='mainHeader__kategories' style={style}>
            <Link to="/">
              <img src='https://i.pinimg.com/736x/e9/e2/78/e9e2787d0cb55d570fe1c76843506759.jpg' width="100%"/>
            </Link>
            <h1>Категорий</h1>
            {kategories.map((value:kata,index)=>{
              return(
                <Link
                  to={`/tovars/${value.name}`} 
                  className='burger__kategories__podkata' 
                  key={index}
                  onClick={reload}
                >
                  <p>{value.name}</p>
                </Link>
              )
            })}
          </div>
      </div>
    )
}
