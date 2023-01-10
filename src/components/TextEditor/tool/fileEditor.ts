import { API } from "@editorjs/editorjs";
import imgFileDefault from "../../../images/fileDefault.png"
import { url } from "../../../url";

class FileEditor {

    data   :any;
    wrapper:any;
    readOnly:any;
    api:API;
  
    static get toolbox() {
      return {
        title: 'Прикрепить файл',
        icon: `<svg width="30" height="17" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8.25C0 3.69 3.69 0 8.25 0H24C27.315 0 30 2.685 30 6C30 9.315 27.315 12 24 12H11.25C9.18 12 7.5 10.32 7.5 8.25C7.5 6.18 9.18 4.5 11.25 4.5H22.5V7.5H11.115C10.29 7.5 10.29 9 11.115 9H24C25.65 9 27 7.65 27 6C27 4.35 25.65 3 24 3H8.25C5.355 3 3 5.355 3 8.25C3 11.145 5.355 13.5 8.25 13.5H22.5V16.5H8.25C3.69 16.5 0 12.81 0 8.25Z" fill="black"/>
        </svg>
        `
      };
    }
    static get isReadOnlySupported() {
      return true;
    }

    constructor({data,readOnly,api}:any){
      this.data = data;
      this.wrapper = undefined;
      this.api = api
    }
    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapperFile') 
        this._createFile()
        return this.wrapper;
    }

    _createFile()
    {
      if(this.data.file)
      {
        const img = document.createElement("img")
        const caption = document.createElement('div');
        const a   = document.createElement('a');    
        const p = document.createElement('p');
        const pNameFiles = document.createElement('p');

        a.href = `${url}${this.data.file}`;
        a.setAttribute("download","") 
        caption.innerHTML = this.data.caption;
        caption.classList.add('blockInput')
        a.classList.add('fileSingle')   
        img.classList.add('imgFileSingleDefault')
        img.src = imgFileDefault
        pNameFiles.classList.add("nameFiles")
        pNameFiles.innerText = this.data.nameFiles
        
        a.appendChild(img)

        this.wrapper.innerHTML = ''
        this.wrapper.appendChild(a)
        this.wrapper.appendChild(pNameFiles)
        this.wrapper.appendChild(p)
        this.wrapper.appendChild(caption)

      } else {
        const button = document.createElement("button")
    
        button.addEventListener("click",()=>{
          this.api.blocks.delete(this.isFirstBlock())
        })
    
        button.classList.add("deleteBlockT")

        const input = document.createElement('input')
        const img = document.createElement("img")
  
        input.placeholder = 'Paste an image URL...';
        input.type = "file"
        input.value = '';
        input.classList.add("inputFileEditor")
  
        input.addEventListener("change",(e:any)=>{
          let reader = new FileReader()
  
          reader.onload = () => {
            const caption = document.createElement('div');
            const a   = document.createElement('a');    
            const p = document.createElement('p');
            const pNameFiles = document.createElement('p');
    
            a.href = reader.result as string;
            a.setAttribute("download","") 

            p.innerText = "Описание"

            caption.contentEditable = "true";
            caption.innerHTML = '';
            caption.classList.add('blockInput')

            a.classList.add('fileSingle')

            img.classList.add('imgFileSingleDefault')
            img.src = imgFileDefault

            pNameFiles.classList.add("nameFiles")
            
            if(input.files)
            pNameFiles.innerText = input.files[0].name
            
            a.appendChild(img)
            this.wrapper.appendChild(a);
            this.wrapper.appendChild(pNameFiles)
            this.wrapper.appendChild(p)
            this.wrapper.appendChild(caption);

            input.classList.remove(input.classList[0])
            input.classList.add("displayNone")
          };
    
          reader.readAsDataURL(e.target.files[0])
        })
  
        this.wrapper.appendChild(input)
        this.wrapper.appendChild(button)
      }
    }

    isFirstBlock() {
      return this.api.blocks.getCurrentBlockIndex();
    }

    save(blockContent:any)
    {
      const file = blockContent.getElementsByClassName('inputFileEditor');
      const caption = blockContent.querySelectorAll('[contenteditable]');
      const nameFiles  = blockContent.getElementsByClassName("nameFiles")

      return {
        file:     false,
        fileSave: file[0].files[0],
        caption:  caption[0].innerHTML || '',
        nameFiles:nameFiles[0].innerText
      } 
    }
}
export default FileEditor