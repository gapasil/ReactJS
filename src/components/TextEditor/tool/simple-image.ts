import { url } from "../../../url";
import leftScrol from "../../../images/toolEditorImage/leftScroll.png"
import rightScrol from "../../../images/toolEditorImage/rightScroll.png"
import { createElement } from 'react';
import { API } from '@editorjs/editorjs';

class SimpleImage {

    data   :any;
    wrapper:any;
    readOnly:any;
    api : API
  
    static get toolbox() {
      return {
        title: 'Изображение или GIF-Файл',
        icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 23.1111V2.88889C26 1.3 24.7 0 23.1111 0H2.88889C1.3 0 0 1.3 0 2.88889V23.1111C0 24.7 1.3 26 2.88889 26H23.1111C24.7 26 26 24.7 26 23.1111ZM7.94444 15.1667L11.5556 19.5144L16.6111 13L23.1111 21.6667H2.88889L7.94444 15.1667Z" fill="black"/>
</svg>
`
      };
    }

    constructor({data,readOnly,api}:any){
      this.data = data;
      this.wrapper = undefined;
      this.api  =  api
    }
  
    render(){
      this.wrapper  = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      if(this.data.file)
      {
        this.wrapper.classList.add('simple-image');
        this._createImage(1)
        return this.wrapper;
      }
      if(this.data.massImg)
      {
        this.wrapper.classList.add('mass-image');
        this._createImage(2)
        return this.wrapper;
      }

      button1.onclick = () =>{
        this._createImage(1)
      }
      button2.onclick = () =>{
        this._createImage(2)
      }

      button1.classList.add('buttonEditor')
      button2.classList.add('buttonEditor')

      button1.innerText = "Создать картинку"
      button2.innerText = "Создать галерею"

      this.wrapper.classList.add('simple-image');
      this.wrapper.appendChild(button1);
      this.wrapper.appendChild(button2);

      return this.wrapper;
    }

    static get isReadOnlySupported() {
      return true;
    }

    isFirstBlock() {
      return this.api.blocks.getCurrentBlockIndex();
    }

    _createImage(type:number){
      if(type == 1){
        if(this.data.file)
        { 
          const blockSimple = document.createElement("div")
          const caption = document.createElement('div');
          const image = document.createElement('img');    
          const p = document.createElement('p');
  
          image.src = `${url}${this.data.file}`;

          if(this.data.caption)
          {
            caption.innerHTML = this.data.caption;
            caption.classList.add('blockInput')
          }

          image.classList.add('ImageSingle')
          blockSimple.classList.add("SimpleImageDec")
  
          this.wrapper.innerHTML = '';
          blockSimple.appendChild(image);
          blockSimple.appendChild(p)
          blockSimple.appendChild(caption);

          this.wrapper.appendChild(blockSimple)

        } else {

          // const button = document.createElement("button")
    
          // button.addEventListener("click",()=>{
          //   this.api.blocks.delete(this.isFirstBlock())
          // })
      
          // button.classList.add("deleteBlockT")

          while (this.wrapper.firstChild) {
            this.wrapper.removeChild(this.wrapper.firstChild);
          }
  
          const input = document.createElement('input')
  
          input.placeholder = 'Paste an image URL...';
          input.type = "file"
          input.value = this.data && this.data.files ? this.data.files : '';
          input.classList.add("inputImg")

          input.addEventListener("change",(e:any)=>{
            if(e.target.files[0].type.split('/')[0] != "image")
            {
              return
            }
  
            let reader = new FileReader()
  
            reader.onload = () => {
              const blockSimple = document.createElement("div")
              const caption = document.createElement('div');
              const image = document.createElement('img');    
              const p = document.createElement('p');
      
              image.src = reader.result as string;
              p.innerText = "Описание"
              caption.contentEditable = "true";
              caption.innerHTML =  '';
              caption.classList.add('blockInput')
              image.classList.add('ImageSingle')
              blockSimple.classList.add("SimpleImageDec")
      
              blockSimple.appendChild(image);
              blockSimple.appendChild(p)
              blockSimple.appendChild(caption);

              this.wrapper.appendChild(blockSimple)

              input.classList.remove(input.classList[0])
              input.classList.add("displayNone")
            };
      
            reader.readAsDataURL(e.target.files[0])
          })
  
          this.wrapper.appendChild(input)
          //this.wrapper.appendChild(button)
        }
      }
      if(type == 2){   
        if(this.data.massImg){
          const blockSlider = document.createElement('div');
          const buttonLeft  = document.createElement('button');
          const buttonRight = document.createElement('button');
          const blockSliderLine = document.createElement('div');
          let count = 0;        

          for(let key of this.data.massImg)
          {
            const caption = document.createElement('div');
            const image = document.createElement('img');    
            const p = document.createElement('p');
            const blockImage = document.createElement('div')

            if(key.caption)
            {
              caption.innerHTML = key.caption;
              caption.classList.add('blockInput')
            }
  
            image.classList.add('Image')
            blockImage.classList.add('blockImage')
            blockSliderLine.classList.add('blockSliderLine')
            blockSlider.classList.add('blockSlider')
  
            image.src = `${url}${key.img}`;
  
            blockImage.appendChild(image)
            blockImage.appendChild(p)
            blockImage.appendChild(caption)
            blockSliderLine.appendChild(blockImage)
            blockSlider.appendChild(blockSliderLine)
            this.wrapper.appendChild(blockSlider)
          }
          let lengthSlider = blockSliderLine.children;

          buttonRight.addEventListener("click",function(){
            count++

            if (count >= lengthSlider.length) {
              count = 0;
            }

            blockSliderLine.style.transform = `translate(-${+count*250}px)`
          })

          buttonLeft.addEventListener("click",function(){
            count--

            if (count < 0) {
              count = lengthSlider.length - 1;
            }
            
            blockSliderLine.style.transform = `translate(-${+count*250}px)`
          })

          buttonRight.classList.add('ButtonRight')
          buttonLeft.classList.add('ButtonLeft')

          const leftSCROLimg = document.createElement("img")
          leftSCROLimg.src = leftScrol

          const rightSCROLimg = document.createElement("img")
          rightSCROLimg.src = rightScrol

          buttonRight.appendChild(rightSCROLimg)
          buttonLeft.appendChild(leftSCROLimg)

          this.wrapper.appendChild(buttonRight)
          this.wrapper.prepend(buttonLeft)

        } else {

          // const button = document.createElement("button")
    
          // button.addEventListener("click",()=>{
          //   this.api.blocks.delete(this.isFirstBlock())
          // })
      
          // button.classList.add("deleteBlockT")
          
          while (this.wrapper.firstChild) {
            this.wrapper.removeChild(this.wrapper.firstChild);
          }
          const container = document.createElement('div');
          const blockHeader = document.createElement('div');
          const blockFooter = document.createElement('div')
  
          const createInput = (previousInput:any) =>{
            const input = document.createElement('input')
            input.placeholder = 'Paste an image URL...';
            input.type = "file"
            input.value = this.data && this.data.files ? this.data.files : '';
            input.classList.add("inputImg")

  
            if(previousInput){
              previousInput.style.display = "none"
              previousInput.classList.add("displayNone")
            }

            blockHeader.appendChild(input)
  
            input.addEventListener("change",(e:any)=>{
              if(e.target.files[0].type.split('/')[0] != "image")
              {
                return
              }
              let reader = new FileReader()
    
              reader.onload = () => {
                const caption = document.createElement('div');
                const blockImage = document.createElement('div')
                const image = document.createElement('img');    
                const p = document.createElement('p');
  
  
                caption.contentEditable = "true";
                caption.innerHTML =  '';
                caption.classList.add('blockInput')
  
                image.classList.add('Image')
                blockImage.classList.add('blockImage')
  
                image.src = reader.result as string;
                p.innerText = "Описание"
  
                blockImage.appendChild(image)
                blockImage.appendChild(p)
                blockImage.appendChild(caption)
                blockFooter.appendChild(blockImage)
  
                createInput(input)
              };
        
              reader.readAsDataURL(e.target.files[0])
            })
          }
          createInput(false)
  
          container.classList.add('containerGallery')
          blockHeader.classList.add('blockHeaderGallery')
          blockFooter.classList.add('blockFooterGallery')
  
          container.appendChild(blockHeader)
          container.appendChild(blockFooter)
          
          this.wrapper.appendChild(container)
          //this.wrapper.appendChild(button)
        }
      }
    }
    
    save(blockContent:any){
      const files = blockContent.getElementsByClassName('displayNone');
      const caption = blockContent.querySelectorAll('[contenteditable]');

      if(files.length > 1){
        const masImg  = []
        let i = 0

        
        for(let key of files)
        {
          const objI = {
            imgSave :key.files[0],
            img     :false,
            caption :caption[i].innerHTML || ""
          }
          masImg.push(objI)
          i++
        }

        return {
          massImgSave: masImg,
          massImg:false
        }

      } else {
        const image = blockContent.getElementsByClassName('displayNone');

        return {
          fileSave:image[0].files[0],
          file: false,
          caption: caption[0].innerHTML || ''
        }
      }
    }
}

export default SimpleImage