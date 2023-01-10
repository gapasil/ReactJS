import { url } from "../../../url";
import { API } from '@editorjs/editorjs';


class VideoEditor {

    data   :any;
    wrapper:any;
    readOnly:any;
    api:API
  
    static get toolbox() {
      return {
        title: 'Видео',
        icon: `<svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.875 0V3.125H18.75V0H6.25V3.125H3.125V0H0V28.125H3.125V25H6.25V28.125H18.75V25H21.875V28.125H25V0H21.875ZM6.25 21.875H3.125V18.75H6.25V21.875ZM6.25 15.625H3.125V12.5H6.25V15.625ZM6.25 9.375H3.125V6.25H6.25V9.375ZM21.875 21.875H18.75V18.75H21.875V21.875ZM21.875 15.625H18.75V12.5H21.875V15.625ZM21.875 9.375H18.75V6.25H21.875V9.375Z" fill="black"/>
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
        this.wrapper.classList.add("wrapperVideo")
        this._createVideo()
        return this.wrapper;
    }

    isFirstBlock() {
      return this.api.blocks.getCurrentBlockIndex();
    }

    _createVideo()
    {
      if(this.data.file)
      {
        const caption = document.createElement('div');
        const video   = document.createElement('video');    
        const p = document.createElement('p');

        if(this.data.caption)
        {
          caption.innerHTML = this.data.caption;
          caption.classList.add('blockInput')
        }

        video.src = `${url}${this.data.file}`;
        video.controls = true
        video.classList.add('VideoSingle')

        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(video);
        this.wrapper.appendChild(p)
        this.wrapper.appendChild(caption);

      } else {

        // const button = document.createElement("button")
    
        // button.addEventListener("click",()=>{
        //   this.api.blocks.delete(this.isFirstBlock())
        // })
    
        // button.classList.add("deleteBlockT")
        
        const input = document.createElement('input')
        input.classList.add('blockInputVideo')
  
        input.placeholder = 'Paste an image URL...';
        input.type = "file"
        input.value = '';
  
        input.addEventListener("change", (e:any)=>{
          if(e.target.files[0].type.split('/')[0] != "video")
          {
            return
          }
          
          let blobURL = URL.createObjectURL(e.target.files[0]);

          const caption = document.createElement('div');
          const video   = document.createElement('video');    
          const p = document.createElement('p');
    
          video.src = blobURL
          video.controls = true

          p.innerText = "Описание"

          caption.contentEditable = "true";
          caption.innerHTML = '';
          caption.classList.add('blockInput')

          video.classList.add('VideoSingle')
    
          this.wrapper.appendChild(video);
          this.wrapper.appendChild(p)
          this.wrapper.appendChild(caption);

          input.classList.remove(input.classList[0])
          input.classList.add("displayNone")
        })
  
        this.wrapper.appendChild(input)
        //this.wrapper.appendChild(button)
      }
    }

    save(blockContent:any)
    {
      const video = blockContent.getElementsByClassName('displayNone');
      const caption = blockContent.querySelectorAll('[contenteditable]');

      return {
        fileSave : video[0].files[0],
        file     : false,
        caption  : caption[0].innerHTML || ''
      }
    }
}
export default VideoEditor