import React,{ ChangeEvent, createRef, useEffect, useState }  from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import styles from "./editorText.module.scss"
import "./simple-image.css"
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import ReactTextareaAutosize from 'react-textarea-autosize';
import EditorJS from '@editorjs/editorjs';
import configuration from '../../components/TextEditor/configuration';
import { editorSlice } from '../../store/reducers/EditorSlice';
import { ButtonBackgroundPost } from '../buttonBackgroundPost/buttonBackgroundPost';
import Select from 'react-select';
import ImgPost from "../../images/addpost.svg"
import { ModalSlice, positionTextModal, typeModal } from '../../store/reducers/Modal';
import { setImagePreview } from '../../hooks/previewImage';
import { LoaderSlice } from '../../store/reducers/Loader';

const EditorText = () =>{
  const [ header , setHeader ] = useState("")
  const [ theme , setTheme ] = useState("")
  const [ language , setLanguage] = useState<any>({value:"rus",label:"Русский"})
  const [ imageView , setImageView ] = useState<File>()
  const [ imageViewP , setImageViewP ] = useState("")
  const [ errEditor , setErrEditor ] = useState<string[]>([])

  const user = useAppSelector(state => state.userReducer)
  let editorRedux = useAppSelector(state => state.editorReducer)

  const [editor , setEditorState] = useState<EditorJS>()

  const { setModal }  = ModalSlice.actions;
  // const { setEditor } = editorSlice.actions;
  const { ActiveLoader , UnActiveLoader } = LoaderSlice.actions;

  const dispatch = useAppDispatch()
  
  // if(!editorRedux.editor){

  //   editor = new EditorJS(configuration("editor"))
    
  //   dispatch(setEditor(
  //     {editor}
  //   ))

  // } else {

  //   editor = editorRedux.editor
  //   console.log(editor);
    
  // }

  useEffect(()=>{
    console.log("editor-create");
    setEditorState(new EditorJS(configuration("editor")))
  },[])

  // useEffect(()=>{
  //   editor = new EditorJS(configuration("editor"))
  // },[])
  
  const url = process.env.REACT_APP_API

  const editorSave = () =>{

    console.log(editor);
    
    editor?.save().then((outputData:any) => {
      let paragraph
      const formData = new FormData() 

      for(let key of outputData.blocks)
      {

        if(key.type == "video")
        {
          formData.append("video", key.data.fileSave)
          continue
        }

        if(key.type == "image")
        {
          if(key.data.massImgSave)
          {

            for(let keyMI of key.data.massImgSave)
            {
              formData.append("MassImgPost",keyMI.imgSave)
            }

          } else {

            formData.append("imgPost",key.data.fileSave)           
             
          }
          continue
        }

        if(key.type == "file")
        {
          formData.append("file", key.data.fileSave)
          continue
        }
        
        if(key.type == "audio")
        {
          formData.append("audio", key.data.fileSave)
          continue
        }

      }

      for(let key of outputData.blocks)
      {
        if(key.type == "paragraph")
        {
          paragraph = key.data.text;
          break
        }
      }

      // console.log({
      //   body:outputData,
      //   theme:theme,
      //   headers:header,
      //   paragraph:paragraph,
      //   language:language,
      //   imageView:imageView
      // })
      
      formData.append("body",JSON.stringify(outputData))

      if(theme)
      formData.append("theme",theme)
      if(header)
      formData.append("headers",header)
      if(paragraph)
      formData.append("paragraph",paragraph)
      if(language.value)
      formData.append("language",language.value)

      if(imageView)
      {
        formData.append("imageView",imageView)
      }

      // const objPost = {
      //   ...outputData,
      //   theme:theme,
      //   headers:header,
      //   paragraph:paragraph
      // }

      dispatch(ActiveLoader())

      fetch(`${url}Post/create-Post`,{
        method  : "POST",
        body : formData,
        headers : {
          "Authorization" : `bearer ${localStorage.getItem("token")}`
        },
      })
      .then((res)    => res.json())
      .then((result) => {

        dispatch(UnActiveLoader())

        if(result.errors)
        {
          //err
          let masErr = []

          for(let key of Object.keys(result.errors))
          {
            if(key == "theme")
            {
              masErr.push("Измените тему")
            }
            if(key == "headers")
            {
              masErr.push("Измените заголовок")
            }
            if(key == "paragraph")
            {
              masErr.push("Измените текст параграфа")
            }
            if(key == "language")
            {
              masErr.push("Выберите язык")
            }
          }

          setErrEditor(masErr)
          return
          
        } else if(result.error){

          dispatch(setModal({
            active : true,
            text   : result.message,
            type   : typeModal.Default,
            positionText : positionTextModal.Left
          }))

          return

        } else {
          document.location.href = `/post/${result}`
        }

      })

    }).catch((error:any) => {
      console.log('Saving failed: ', error)
    });
  }


  ///стили селектора

  const optionsSelect = [
    { value: 'rus', label: 'Русский' },
    { value: 'eng', label: 'Англиский' }
  ];

  const customStyles = {
    option: (provided:any, state:any) => ({
      ...provided,
      background: state.isSelected ? '#929292' : 'white',
      padding: 20,
      height: "20px",
      display: "flex",
      alignItems: "center"
    }),
    menu: (provided:any, state:any) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 20,
      position: "static",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display:"flex",
      border:"1px solid #929292",
      width: "100%",
      maxWidth: "400px",
      justifyContent: "start",
      background: "#F9F9F9",
      boxShadow: "inset 0px 1px 2px #929292",
      borderRadius:"6px"
    }),
    container:()=>({
      width:"90%",
      maxWidth:"1000px"
    }),
    singleValue: (provided:any, state:any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.error}>
        {errEditor?.map((value)=>{
          return(
            <p>{value}</p>
          )
        })}
      </div>

      <div className={styles.container__ContainerUser}>
        <div className={styles.container__ContainerUser__blockUser}>
          <div className={styles.container__ContainerUser__blockUser__img}>
              <img
                className={styles.buttonUser__img}
                src={user.users[0].avatar}
              />
          </div>
          <p>{user.users[0].firstName}    {user.users[0].lastName}</p>
        </div>
      </div>

      <div className={styles.header}>
        <ReactTextareaAutosize  maxRows={5} maxLength={180} placeholder='Введите Заголовок Публикации (до 5-и строк), перенос строки по Enter работает' onChange={(e:any)=>setHeader(e.target.value)}/>
      </div>

      <div id="editorjs"></div>

      <div className={styles.container__configPost}>

        <div className={styles.theme}>
          <div className={styles.theme__decInput}>
            <div className={styles.theme__decInput__text}>
              <p className={styles.redZ}>*</p>
              <p>Выбрать темы:</p>
            </div>
            <Input maxLength={30} onChange={(e:string)=>setTheme(e)} typeStyle={"2"}/>
          </div>
        </div>

        <div className={styles.lang}>
            <div className={styles.lang__text}>
              <p className={styles.redZ}>*</p>
              <p>Выбрать язык публикации:</p>
            </div>
          <Select
            styles={customStyles}
            defaultValue={language}
            onChange={setLanguage}
            options={optionsSelect}
          />
        </div>

        <div className={styles.imgDeployInput}>
          <div className={styles.imgDeployInput__block}>
            <ButtonBackgroundPost
              callBack={(e:ChangeEvent)=> setImagePreview({
                e : e, 
                setPreview : setImageViewP , 
                setFile : setImageView
              })}
              text={"Выберите обложку статьи:"}
            />
          </div>
        </div>

        <div className={styles.imagePcontainer}>
          <div className={styles.imagePcontainer__imageP}>
            <img
              src={imageViewP}
            />
          </div>
        </div>

      </div>

      <div className={styles.containerButton}>
        <Button 
          type={5}
          callBack={editorSave}
        >
          <div style={{"display":"flex","alignItems":"center"}}>
            <ImgPost/>
            <p>ОПУБЛИКОВАТЬ</p>
          </div>
        </Button>
      </div>

    </div>  
  )
}

export default EditorText
