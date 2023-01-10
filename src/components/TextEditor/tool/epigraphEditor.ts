import { API } from "@editorjs/editorjs";
import imgFileDefault from "../../../images/fileDefault.png"

class EpigraphEditor {

    data   :any;
    wrapper:any;
    readOnly:any;
    api : API
  
    static get toolbox() {
      return {
        title: 'Эпиграф',
        icon: `<svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.5455 5.56174H13.6364V13.9043H24.5455V5.56174ZM27.2727 0H2.72727C1.22727 0 0 1.25139 0 2.78087V22.2469C0 23.7764 1.22727 25 2.72727 25H27.2727C28.7727 25 30 23.7764 30 22.2469V2.78087C30 1.25139 28.7727 0 27.2727 0ZM27.2727 22.2608H2.72727V2.75306H27.2727V22.2608Z" fill="black"/>
        </svg>
        `
      };
    }
    static get isReadOnlySupported() {
      return true;
    }

    constructor({ data, readOnly, api }:any){
      this.data = data;
      this.api  = api;
      this.wrapper = undefined;
    }
    render(){
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('wrapperEpigraph') 
      this._createEpigraph()
      return this.wrapper;
    }

    isFirstBlock() {
      return this.api.blocks.getCurrentBlockIndex();
    }

    _createEpigraph()
    {
      if(this.data.text)
      {

        const containerEpigr = document.createElement('div');
        const blockText = document.createElement('div');
        const text   = document.createElement('div');
        const author = document.createElement('div');

        text.classList.add("textEpigraphT")
        author.classList.add("authorEpigraphT")
        blockText.classList.add("blockTextEpigraph")
        containerEpigr.classList.add("containerEpigr")

        text.innerHTML = this.data.text
        author.innerHTML = this.data.author

        blockText.append(text,author)
        containerEpigr.appendChild(blockText)

        this.wrapper.appendChild(containerEpigr)

      } else {
        const button = document.createElement("button")
    
        button.addEventListener("click",()=>{
          this.api.blocks.delete(this.isFirstBlock())
        })
    
        button.classList.add("deleteBlockTEpigr")

        const containerEpigr = document.createElement('div');
        const blockText = document.createElement('div');
        const text   = document.createElement('div');
        const author = document.createElement('div');

        const pText = document.createElement('p');
        const pAuthor = document.createElement('p');

        pText.innerText = "Цитата"
        pAuthor.innerText = "Автор"

        text.contentEditable = "true";
        author.contentEditable = "true";

        text.classList.add("textEpigraph")
        author.classList.add("authorEpigraph")
        blockText.classList.add("blockTextEpigraph")
        containerEpigr.classList.add("containerEpigr")

        blockText.append(pText,text,pAuthor,author)
        containerEpigr.appendChild(blockText)

        this.wrapper.appendChild(button)
        this.wrapper.appendChild(containerEpigr)
      };
    }

    save(blockContent:any)
    {
      const text  = blockContent.getElementsByClassName("textEpigraph")
      const author  = blockContent.getElementsByClassName("authorEpigraph")

      return {
        text: text[0].innerHTML ,
        author: author[0].innerHTML ,
      } 
    }
}

export default EpigraphEditor