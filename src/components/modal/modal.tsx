import style from "./modal.module.scss"
import React , { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ModalSlice, positionTextModal, typeModal } from "../../store/reducers/Modal";
import { Button } from '../button/Button';
import  X  from "../../images/крестик.png"

export const Modal = () => {
    const modal = useAppSelector(state => state.modalReducer)
    const [ visibleState , setVisibleState ] = useState<boolean>(false)

    const { setModal } = ModalSlice.actions;
    const dispatch = useAppDispatch()

    const unVisibleModal = ():void =>{

        setVisibleState(false)

        dispatch(setModal({
            active : false,
            text   : "",
            type   : typeModal.Default,
            positionText : positionTextModal.Center
        }))
    }

    const setStateSelect = (i:boolean) =>{
        if(modal.state)
        modal.state(i)
    }

    const SelectTypeModal = ():JSX.Element =>{

        if(modal.type == "select"){
            return(
                <div className={
                    modal.positionText == "left"?
                        style.container__blockLeft
                        :
                        style.container__blockCenter
                }>
                    <h1>{modal.text}</h1>
                    <div className={style.container__blockButton}>
                        <Button
                            type={3}
                            callBack={()=>setStateSelect(true)}
                        >
                            <p>Да</p>
                        </Button>
                        <Button
                            type={3}
                            callBack={()=>setStateSelect(false)}
                        >
                            <p>Нет</p>
                        </Button>
                    </div>
                </div>
            )
        } else if(modal.type == "default"){
            return(
                <div className={
                    modal.positionText == "left"?
                        style.container__blockLeft
                        :
                        style.container__blockCenter
                }>
                    {modal.text}
                    
                </div>
            )
        } else {
            return(
                <div className={
                    modal.positionText == "left"?
                        style.container__blockLeft
                        :
                        style.container__blockCenter
                }>
                    {modal.text}
                    
                </div>
            )
        }
    }

    useEffect(()=>{
        setVisibleState(modal.active)
    },[modal])

    if(visibleState)
    {
        return (
            <div className={style.background} onClick={unVisibleModal}>
                <div className={style.container} onClick={unVisibleModal}>
                    <button onClick={unVisibleModal}>
                        <img src={X}/>
                    </button>              
                    {SelectTypeModal()}
                </div>
            </div>
        )
    } else {
        return(
            null
        )
    }
}
