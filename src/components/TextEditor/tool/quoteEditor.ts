import quotes from "../../../images/цитата.png"
import { API } from '@editorjs/editorjs';

class QuoteEditor {

    data   :any;
    wrapper:any;
    readOnly:any;
    api:API
  
    static get toolbox() {
      return {
        title: 'Цитата',
        icon: `<svg width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.85714 18.5714H7.42857L11.1429 11.1429V0H0V11.1429H5.57143L1.85714 18.5714ZM16.7143 18.5714H22.2857L26 11.1429V0H14.8571V11.1429H20.4286L16.7143 18.5714Z" fill="black"/>
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

    isFirstBlock() {
      return this.api.blocks.getCurrentBlockIndex();
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapperEpigraph') 
        this._createEpigraph()
        return this.wrapper;
    }

    _createEpigraph()
    {
      if(this.data.text)
      {
        const contQuotes = document.createElement('div');
        const basicTextAndquotes = document.createElement('div'); 
        const basicText  = document.createElement('div'); 
        const authorName = document.createElement('div');
        const line = document.createElement('div');
        const imgQotes   = document.createElement('img');

        basicText.classList.add("basicTextQuote")
        authorName.classList.add("authorName")
        basicTextAndquotes.classList.add("basicTextAndquotes")
        line.classList.add("line")
        contQuotes.classList.add("contQuotes")
        imgQotes.classList.add("imgQotes")
        imgQotes.src = quotes

        basicText.innerHTML = this.data.text
        authorName.innerHTML = this.data.name

        basicTextAndquotes.append(imgQotes,basicText)

        contQuotes.append(basicTextAndquotes,line,authorName)
        this.wrapper.appendChild(contQuotes)

      } else {

        const button = document.createElement("button")
    
        button.addEventListener("click",()=>{
          this.api.blocks.delete(this.isFirstBlock())
        })
    
        button.classList.add("deleteBlockT")

        const contQuotes = document.createElement('div');
        const basicTextAndquotes = document.createElement('div'); 
        const basicText  = document.createElement('div'); 
        const authorName = document.createElement('div');
        const line = document.createElement('div');
        const imgQotes   = document.createElement('img');
        const pText = document.createElement('p');
        const pAuthor = document.createElement('p');

        pText.innerText = "Цитата"
        pAuthor.innerText = "Автор"

        basicText.contentEditable = "true";
        authorName.contentEditable = "true";

        basicText.classList.add("basicTextQuote")
        authorName.classList.add("authorName")
        basicTextAndquotes.classList.add("basicTextAndquotes")
        line.classList.add("line")
        contQuotes.classList.add("contQuotes")
        imgQotes.classList.add("imgQotes")
        imgQotes.src = quotes

        basicTextAndquotes.append(imgQotes,basicText)

        contQuotes.append(pText,basicTextAndquotes,line,pAuthor,authorName)
        this.wrapper.appendChild(contQuotes)
        this.wrapper.appendChild(button)
      };
    }

    save(blockContent:any)
    {
      const name  = blockContent.getElementsByClassName("authorName")
      const text  = blockContent.getElementsByClassName("basicTextQuote")


      return {
        text: text[0].innerHTML,
        name: name[0].innerHTML
      } 
    }
}
export default QuoteEditor