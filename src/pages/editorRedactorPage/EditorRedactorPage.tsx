import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import styles from "./editorRedactorPage.module.scss"
import EditorText from '../../components/TextEditor/EditorText';

export const TovarRedactorPage = () => {
  const user = useAppSelector(state => state.userReducer)

  if(user.authorization){
    return (
      <div className={styles.container}>
        <EditorText />
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <p>Неавторизованн</p>
      </div>
    )
  }
}

