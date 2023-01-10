import React from 'react'
import { ContainerPost } from '../../components/blockPost/ContainerPost'
import style from "./postListPage.module.scss"
import { LeftMenu } from './menu/LeftMenu';

export const PostListPage = () => {

  return (
    <div className={style.container}>
      <div className={style.container__blockMenu}>
        <div className={style.container__blockMenu__block}>
          <LeftMenu/>
        </div>
      </div>
      <ContainerPost/>
    </div>
  )
}
