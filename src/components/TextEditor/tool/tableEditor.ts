import addLeftTableIcon from "../../../images/addLeftTable.png"
import addRightTableIcon from "../../../images/addRightTable.png"
import addTopTableIcon from "../../../images/addTopTable.png"
import addBottomTableIcon from "../../../images/addBottomTable.png"
import deleteBottomTableIcon from "../../../images/deleteBottomTable.png"
import deleteRightTableIcon from "../../../images/deleteRightTable.png"
import { API } from '@editorjs/editorjs';

interface cell {
  tr:any;
  td:Array<any>
}

class TableEditor{

  data: any;
  wrapper: any;
  readOnly: any;
  tableSchemas:Array<cell>;
  api : API

  static get toolbox() {
    return {
      title: 'Таблица',
      icon: `<svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.57895 9.464H16.4211V24.2667H9.57895V9.464ZM19.1579 24.2667H23.2632C24.7684 24.2667 26 23.0533 26 21.5704V9.43704H19.1579V24.2667ZM23.2632 0H2.73684C1.23158 0 0 1.21333 0 2.6963V6.74074H26V2.6963C26 1.21333 24.7684 0 23.2632 0ZM0 21.5704C0 23.0533 1.23158 24.2667 2.73684 24.2667H6.84211V9.43704H0V21.5704Z" fill="black"/>
      </svg>
      `
    };
  }
  static get isReadOnlySupported() {
    return true;
  }

  constructor({ data, readOnly, api }: any) {
    this.data = data;
    this.wrapper = undefined;
    this.tableSchemas = [
      {
        tr:false,
        td:[]
      },
      {
        tr:false,
        td:[]
      },
      {
        tr:false,
        td:[]
      }
    ];
    this.api = api
  }
  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapperTable')
    this._createTable()
    return this.wrapper;
  }

  _createTable() {

    if (this.data.td) {

      const container = document.createElement("div")
      container.classList.add("container")

      const table = document.createElement("table")
      table.classList.add("table")

      const tbody = document.createElement("tbody")
      tbody.classList.add("tbody")

      for(let key of this.data.td)
      {
        const tr = document.createElement("tr")

        for(let keyText of key)
        {
          const td = document.createElement("td")
          const p  = document.createElement("p")
          p.innerText = keyText

          td.classList.add("cell")
          td.appendChild(p)
          tr.appendChild(td)
        }

        tbody.appendChild(tr)
      }

      container.appendChild(tbody)

      table.appendChild(container)
        
      this.wrapper.appendChild(table)

    } else {

      const button = document.createElement("button")
    
      button.addEventListener("click",()=>{
        this.api.blocks.delete(this.isFirstBlock())
      })
  
      button.classList.add("deleteBlockT")

      let cur:any

      const container = document.createElement("div")
      container.classList.add("container")

      const table = document.createElement("table")
      table.classList.add("table")

      const tbody = document.createElement("tbody")
      tbody.classList.add("tbody")

      const lineToolBlock  = document.createElement("div")

      const addLeftButton  = document.createElement("button")
      const addRightButton = document.createElement("button")
      const addTopButton   = document.createElement("button")
      const addFoterButton = document.createElement("button")
      const deleteRightButton = document.createElement("button")  
      const deleteFoterButton = document.createElement("button")

      const addLeftIcon  = document.createElement("img")
      const addRightIcon = document.createElement("img")
      const addTopIcon   = document.createElement("img")
      const addFoterIcon = document.createElement("img")
      const deleteRightIcon = document.createElement("img")  
      const deleteFoterIcon = document.createElement("img")

      addLeftIcon.src  = addLeftTableIcon
      addRightIcon.src = addRightTableIcon
      addTopIcon.src   = addTopTableIcon
      addFoterIcon.src = addBottomTableIcon
      deleteFoterIcon.src = deleteBottomTableIcon
      deleteRightIcon.src = deleteRightTableIcon

      addFoterButton.appendChild(addFoterIcon)
      addLeftButton.appendChild(addLeftIcon)
      addRightButton.appendChild(addRightIcon)
      addTopButton.appendChild(addTopIcon)
      deleteFoterButton.appendChild(deleteFoterIcon)
      deleteRightButton.appendChild(deleteRightIcon)

      addFoterButton.classList.add("knopTableTool")
      addLeftButton.classList.add("knopTableTool")
      addRightButton.classList.add("knopTableTool")
      addTopButton.classList.add("knopTableTool")
      deleteFoterButton.classList.add("knopTableTool")
      deleteRightButton.classList.add("knopTableTool")

      lineToolBlock.append(addLeftButton,addRightButton,deleteRightButton,addTopButton,addFoterButton,deleteFoterButton)

      const tr1 = document.createElement("tr")
      const tr2 = document.createElement("tr")
      const tr3 = document.createElement("tr")

      const td1 = document.createElement("td")
      const td2 = document.createElement("td")
      const td3 = document.createElement("td")
      const td4 = document.createElement("td")
      const td5 = document.createElement("td")
      const td6 = document.createElement("td")
      const td7 = document.createElement("td")
      const td8 = document.createElement("td")
      const td9 = document.createElement("td")

      const masCell:Array<cell> = [
        {
          tr:tr1,
          td:[td1,td2,td3]
        },
        {
          tr:tr2,
          td:[td4,td5,td6]
        },
        {
          tr:tr3,
          td:[td7,td8,td9]
        }
      ]

      //toolTable
      addLeftButton.addEventListener("click",()=>{

        for(let key of masCell)
        {
          const td = document.createElement("td")
          key.td.unshift(td)
        }

        tableRender()
      })

      addRightButton.addEventListener("click",()=>{
        
        for(let key of masCell)
        {
          const td = document.createElement("td")
          key.td.push(td)
        }

        tableRender()
      })

      addTopButton.addEventListener("click",()=>{
        const tr = document.createElement("tr")

        const objCell:cell = {
          tr:tr,
          td:[]
        }

        for(let i = 0; i <= masCell[0].td.length-1; i++)
        {
          const td = document.createElement("td")
          objCell.td.push(td)
        }
        
        masCell.unshift(objCell)
        tableRender()
      })

      addFoterButton.addEventListener("click",()=>{
        const tr = document.createElement("tr")

        const objCell:cell = {
          tr:tr,
          td:[]
        }

        for(let i = 0; i <= masCell[0].td.length-1; i++)
        {
          const td = document.createElement("td")
          objCell.td.push(td)
        }
        
        masCell.push(objCell)
        tableRender()
      })

      deleteFoterButton.addEventListener("click",()=>{
        masCell.splice(masCell.length-1, 1)
        tableRender()
      })

      deleteRightButton.addEventListener("click",()=>{
        for(let key of masCell)
        {
          key.td.splice(key.td.length-1,1)
        }
        tableRender()
      })

      // const moveTable = (e:any) =>{
      //   console.log(e);
        
      //   if(e.fromElement.className == "cell")
      //   {
      //     console.log(e.fromElement.getBoundingClientRect());
      //   }
      // }

      const unhook = (e:any) => {
        if( cur )
          cur = null;
      }

      const move = (e:any) => {
        if( !cur )
          return;
        e = e || window.event;
        console.log(e.clientX);
        console.log(cur.x);
        
        
        let nx = e.clientX - cur.x;
            // var ny = e.clientY - y;
      
        if( nx < 50 ) nx = 50;
            // if( ny < 30 ) ny = 30;
      
        cur.el.style.columnWidth = nx + 'px';
        cur.el.style.width = nx + "px"
          // el.style.height = ny  + 'px';
      }
      
      document.onmouseup = unhook;
      document.onmousemove = move;

      const tableRender = () =>{
        
        if(tbody.firstChild)
        {
          for(let i = 0; i <= tbody.childNodes.length; i++)
          {
            if(tbody.childNodes[i]){   
              while(tbody.childNodes[i].firstChild)
              {
                const elem = tbody.childNodes[i].firstChild as ChildNode
                tbody.childNodes[i].removeChild(elem)   
              }
            }
          }
        }

        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
        }
        
        for(let key of masCell)
        {
          this.tableSchemas = masCell
          
          for(let i = 0; i <= key.td.length; i++)
          {
            if(!key.td[i])
            {
              continue
            }

            key.td[i].classList.add("cell")
            
            if(key.td[i].firstChild)
            {
              continue
            }     
            
            const block = document.createElement("div")
            const line = document.createElement("div")
            const textarea = document.createElement("textarea")

            block.style.display = "flex"
            block.style.height = "100%"
            line.classList.add("line")
            

            line.addEventListener("mousedown", (e: any) => {
              e = e || window.event;
              let el = e.target.parentNode.parentNode

              console.log(el);
  
              if(el)
              cur = { 'el': el, 'x': e.clientX }
            })
  
            textarea.addEventListener("input", ()=>{
  
              textarea.style.height = 'auto';
              textarea.style.height = (textarea.scrollHeight) + 'px';//////console.log(this.scrollHeight);
  
            }, false);

            block.appendChild(textarea)

            if(i < key.td.length - 1 )
            {
              block.appendChild(line)
            }

            key.td[i].appendChild(block)
          }
          key.tr.append(...key.td)
  
          tbody.appendChild(key.tr)
        }
  
        container.append(tbody)
  
        table.appendChild(container)
        
        this.wrapper.appendChild(lineToolBlock)
        this.wrapper.appendChild(table)
        this.wrapper.appendChild(button)
      }
      tableRender()
    };
  }

  isFirstBlock() {
    return this.api.blocks.getCurrentBlockIndex();
  }

  save(blockContent: any) {
    let masTD = []
    
    for(let key of this.tableSchemas)
    {
      let masOneTd = []

      for(let keyTd of key.td)
      {
        masOneTd.push(keyTd.firstChild.firstChild.value)
      }

      masTD.push(masOneTd)
    }
    
    return {
      td:masTD
    }
  }
}
export default TableEditor