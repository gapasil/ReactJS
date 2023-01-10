import React from 'react'
import { Link } from 'react-router-dom'
import style from "./LeftMenu.module.scss"
import Img1 from "../../../images/menuTitle/titleMenuPage.svg"
import Plus from "../../../images/plus.png"
import Img4 from "../../../images/menuTitle/info.svg"
import Img5 from "../../../images/menuTitle/help.svg"
import DemoL1 from "../../../images/menuTitle/demoLink1.svg"
import DemoL2 from "../../../images/menuTitle/demoLink2.svg"
import DemoL3 from "../../../images/menuTitle/demoLink3.svg"
import DemoL4 from "../../../images/menuTitle/demoLink4.svg"
import { useAppSelector } from '../../../hooks/redux'


export const LeftMenu = () => {

  const burgerState = useAppSelector(state => state.burgerReducer)
  
  if(burgerState.active)
  {
    return (
      <div className={style.container}>
          <div className={style.container__links}>
  
              <Link
                to={"/"}
              >
                  <Img1/>
                  <p>Лента публикаций</p>
              </Link>

              <Link
                to={"/"}
              >
                  <img src={Plus}/>
                  <p>Публикация</p>
              </Link>
  
              <Link
                to={"/"}
              >
                  <Img4/>
                  <p>О Сайте</p>
              </Link>
  
              <Link
                to={"/"}
              >
                  <Img5/>
                  <p>Обратная связь</p>
              </Link>
  
          </div>
  
          <div className={style.container__linksFooter}>
  
              <Link
                to={"/"}
              >
              <DemoL1/>
              </Link>
  
              <Link
                to={"/"}
              >
              <DemoL2/>
              </Link>
  
              <Link
                to={"/"}
              >
              <DemoL3/>
              </Link>
  
              <Link
                to={"/"}
              >
              <DemoL4/>
              </Link>
  
          </div>
      </div>
    )
  } else {
    return(
      <div>

      </div>
    )
  }
}
