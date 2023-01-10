import React,{ useEffect , useState} from 'react'
import { DateFilter } from './filterElem/date/date';
import { GetUserMenu } from './filterElem/author/getUserMenu';
import { BlockTheme } from './filterElem/theme/blockTheme';
import { filterPostSlice, filterPostState } from '../../../store/reducers/FilterPost';
import { Button } from '../../button/Button';
import Select from 'react-select';
import style  from "./filterPost.module.scss"
import { useAppDispatch } from '../../../hooks/redux';

export interface filterVisible {
    view:boolean;
    theme:boolean;
    date:boolean;
    idUser:boolean;
    lang:boolean;
}

export const FilterPost = () => {

    const [ objFilter , setObjFilter ] = useState<filterPostState>({value:10,language:"rus"})
    const [ theme     , setTheme ] = useState<string|boolean>("")
    const [ language  , setLanguage] = useState<any>({value:"rus",label:"Русский"})
    const [ visibleFilter , setVisibleFilter ] = useState<filterVisible>({
        view:false,
        theme:false,
        date:false,
        idUser:false,
        lang:false
    })

    const { setPostFilter } = filterPostSlice.actions;
    const dispatch = useAppDispatch()

    useEffect(()=>{
        setObjFilter({...objFilter , theme : theme})
    },[theme])
    
    useEffect(()=>{
        setObjFilter({...objFilter , language : language.value})
    },[language])

    useEffect(()=>{

        console.log(objFilter);

        if(JSON.stringify(objFilter) == JSON.stringify({value:10,language:"rus"}))
        {
            return
        }

        const newFilterValue = `/posts?view=${objFilter.view}&theme=${objFilter.theme}&date=${objFilter.date?.minDate},${objFilter.date?.maxDate}&idUser=${objFilter.idUser}&value=${objFilter.value}&language=${objFilter.language}`
        
        if(location.pathname + location.search != newFilterValue)
        {
            history.replaceState({}, '', newFilterValue);
        }  
        
        dispatch(setPostFilter(objFilter))

    },[objFilter])

    useEffect(()=>{

        if(location.search.length == 0)
        {
            return
        }

        const search = location.search.substr(1)
        .split('&') // разбиваем на параметры
        .reduce(function (res:any, a) { // разбираем пары ключ-значение
            const t = a.split('=');
                
            // нужно декодировать и ключ и значение, значения может не быть
            res[decodeURIComponent(t[0])] = t.length == 1 ? null : decodeURIComponent(t[1]);
            return res
        }, {});

        search.date = search.date?.split(",")        
        
        const objFilterPost : filterPostState = {
            view  : search.view  == "undefined" ? undefined : search.view,
            theme : search.theme === "undefined"? undefined : search.theme,
            date:{
              minDate: search.date[0] === "undefined"? undefined : search.date[0],
              maxDate: search.date[1] === "undefined"? undefined : search.date[1],
            },
            idUser: search.idUser === "undefined"? undefined : search.idUser,
            value : search.value  === "undefined"? undefined : search.value,
            language: search.language  === "undefined"? undefined : search.language,
        }

        console.log(objFilter);
        console.log(objFilterPost);
        
        setObjFilter(objFilterPost)

    },[])

    let DateFilterF = (min:any,max:any) =>{
        setObjFilter({...objFilter,date:{
          minDate: min? min : objFilter.date?.minDate,
          maxDate: max? max : objFilter.date?.maxDate,
        }})
    }
    
    const cbUserFilter = (IdUser:string) =>{
        setObjFilter({...objFilter , idUser : IdUser})
    }
    
        //стили селектора
    const optionsSelect = [
        { value: 'rus', label: 'Русский' },
        { value: 'eng', label: 'Англиский' }
    ];

    const customStyles = {
        option: (provided:any, state:any) => ({
            ...provided,
            background: state.isSelected ? '#929292' : 'white',
            padding: 20,
        }),
        menu: (provided:any, state:any) => ({
            ...provided,
            width: state.selectProps.width,
            borderBottom: '1px dotted pink',
            color: state.selectProps.menuColor,
            padding: 20,
            position: "static"
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
            width:"100%",
            maxWidth:"650px"
        }),
        singleValue: (provided:any, state:any) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
        
            return { ...provided, opacity, transition };
        }
    }

    return (
        <div className={style.filterPostContainer}>

            <div className={style.mobileFilterPost}>

            </div>

            <div className={style.filterPost}>
            <p>Найти по</p>

            <Button
                type={3}
                callBack={()=>{setVisibleFilter({
                    view:visibleFilter.view,
                    theme:false,
                    date:false,
                    idUser:true,
                    lang:false
                })}}
                active={visibleFilter.idUser}
            >
                <p>Автору</p>
            </Button>

            <Button
                type={3}
                callBack={()=>{setVisibleFilter({
                    view:visibleFilter.view,
                    theme:false,
                    date:true,
                    idUser:false,
                    lang:false
                })}}
                active={visibleFilter.date}
            >
                <p>Периоду</p>
            </Button>

            <Button
                type={3}
                callBack={()=>{setVisibleFilter({
                    view:visibleFilter.view,
                    theme:false,
                    date:false,
                    idUser:false,
                    lang:true
                })}}
                active={visibleFilter.lang}
            >
                <p>Языку</p>
            </Button>
                
            <Button
                type={3}
                callBack={()=>{

                if(objFilter.view)
                {
                    setVisibleFilter({
                        view:false,
                        theme:false,
                        date:false,
                        idUser:false,
                        lang:false
                    })
                    setObjFilter({...objFilter,view:false})

                } else if(!objFilter.view)
                {

                    setVisibleFilter({
                    view:true,
                    theme:false,
                    date:false,
                    idUser:false,
                    lang:false
                    })
                    setObjFilter({...objFilter,view:true})

                }
                }}
                active={visibleFilter.view}
            >
                <p>Просмотрам</p>
            </Button>

            <Button
                type={3}
                callBack={()=>{setVisibleFilter({
                    view:visibleFilter.view,
                    theme:true,
                    date:false,
                    idUser:false,
                    lang:false
                })}}
                active={visibleFilter.theme}
            >
                <p>Теме</p>
            </Button>

            <Button
                type={4}
                callBack={()=>{setObjFilter({
                    view:undefined,
                    theme:undefined,
                    date:undefined,
                    idUser:undefined,
                    value:10,
                    language:undefined
                })}}
            >
                <p>Сбросить</p>
            </Button>        

            </div>

            <div className={style.blockFilter}>
                {visibleFilter.theme?
                    <div>       
                        <BlockTheme
                        cb={setTheme}
                        />
                    </div>
                    :
                    <div>
                    
                    </div>
                }
                
                {visibleFilter.date?
                    <div>
                        <DateFilter
                        cb={DateFilterF}
                        />
                    </div>
                    :
                    <div>
                    
                    </div>
                }

                {visibleFilter.idUser?
                    <div>
                        <GetUserMenu
                        cbUser={cbUserFilter}
                        />
                    </div>
                    :
                    <div>
                    
                    </div>
                }

                {visibleFilter.lang?
                    <div className={style.lang}>
                    <div className={style.lang__text}>
                        <p className={style.redZ}>*</p>
                        <p>Выбрать язык публикации:</p>
                    </div>
                    <Select
                        styles={customStyles}
                        defaultValue={language}
                        onChange={setLanguage}
                        options={optionsSelect}
                    />
                    </div>
                    :
                    <div>
                    
                    </div>
                }

            </div>
        </div>

    )
}
