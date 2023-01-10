import React from 'react'
import SimpleImage from './tool/simple-image';
import VideoEditor from './tool/VideoEditorJS';
import FileEditor from './tool/fileEditor';
import SeparatorEditor from './tool/separatorEditor';
import AudioEditor from './tool/audioEditor';
import TableEditor from './tool/tableEditor';
import SelectedTextEditor from './tool/selectedTextEditor';
import Header from './tool/Header';
import Paragraph from './tool/Paragraph';
import ListNum from './tool/ListNum';
import List from './tool/List'
import Strikethrough from './inlineTool/strikethrough/Strikethrough';

const configuration = ( type:string, data?:any ): any  => {

  if(type == "editor")
  {
    return ({
      holder:"editorjs",

      inlineToolbar:['link', 'bold', 'italic' ],///, "clear"
      
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link'],
        },
        paragraph:{
          class: Paragraph,
          inlineToolbar: true,
        },
        image:{
          class: SimpleImage,
          inlineToolbar: true
        },
        video:{
          class: VideoEditor,
          inlineToolbar: true
        },
        selectedText:{
          class: SelectedTextEditor,
          inlineToolbar: true,
        },
        listNum: { 
          class: ListNum, 
          inlineToolbar: true 
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        table:{
          class: TableEditor,
          inlineToolbar: true,
        },
        audio:{
          class: AudioEditor
        },
        separator:{
          class: SeparatorEditor
        },
        file:{
          class: FileEditor,
          inlineToolbar: true
        },
        strikethrough: {
          class: Strikethrough,
        },
      },

      toolNames:{

        "Heading": "Заголовок",

      },

      i18n: {
        /**
         * @type {I18nDictionary}
         */

        messages: {
          /**
           * Other below: translation of different UI components of the editor.js core
           */
          ui: {
            "blockTunes": {
              "toggler": {
                "Click to tune": "Нажмите, чтобы настроить",
                "or drag to move": "или перетащите"
              },
            },
            "inlineToolbar": {
              "converter": {
                "Convert to": "Конвертировать в"
              }
            },
            "toolbar": {
              "toolbox": {
                "Add": "Добавить"
              }
            }
          },
      
          /**
           * Section for translation Tool Names: both block and inline tools
           */
          toolNames: {
            "Text": "Текст",
            "Heading": "Заголовок",
            "ListNum": "Нумерованный список",
            "List"   : "Список",
            "Warning": "Примечание",
            "Checklist": "Чеклист",
            "Quote": "Цитата",
            "Code": "Код",
            "Delimiter": "Разделитель",
            "Raw HTML": "HTML-фрагмент",
            "Table": "Таблица",
            "Link": "Ссылка",
            "Marker": "Маркер",
            "Bold": "Полужирный",
            "Italic": "Курсив",
            "InlineCode": "Моноширинный",
          },
      
          /**
           * Section for passing translations to the external tools classes
           */
          tools: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
             * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
             */
            "warning": { // <-- 'Warning' tool will accept this dictionary section
              "Title": "Название",
              "Message": "Сообщение",
            },
        
      
            /**
             * Link is the internal Inline Tool
             */
            "link": {
              "Add a link": "Вставьте ссылку"
            },
            /**
             * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
             */
            "stub": {
              'The block can not be displayed correctly.': 'Блок не может быть отображен'
            }
          },
      
          /**
           * Section allows to translate Block Tunes
           */
          blockTunes: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
             * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
             *
             * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
             */
            "delete": {
              "Delete": "Удалить"
            },
            "moveUp": {
              "Move up": "Переместить вверх"
            },
            "moveDown": {
              "Move down": "Переместить вниз"
            },
            "footnotes": {
              "Footnote" : "Сноска",
              "Apply"    : "Добавить",
              "Remove"   : "Удалить"
            }
          },
        }
      },

      placeholder: 'Нажмите Tab для открытия списка с блоками.',
    })
  }
  if(type == "view" && data)
  {
    return ({
      holder:"editorjs",
      tools: { 
        header: {
          class: Header , 
          inlineToolbar: ['link'],
        }, 
        ListNum: { 
          class: ListNum, 
          inlineToolbar: true 
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        paragraph:{
          class: Paragraph,
          inlineToolbar: true,
        },
        image:{
          class: SimpleImage,
          inlineToolbar: true
        },
        video:{
          class: VideoEditor,
          inlineToolbar: true
        },
        file:{
          class: FileEditor,
          inlineToolbar: true
        },
        separator:{
          class: SeparatorEditor
        },
        audio:{
          class: AudioEditor
        },
        table:{
          class: TableEditor,
          inlineToolbar: true,
        },
        selectedText:{
          class: SelectedTextEditor,
          inlineToolbar: true,
        },
        strikethrough: {
          class: Strikethrough,
        }
      },
      data:data,
      readOnly: true,
      placeholder: 'Нажмите Tab для открытия списка с блоками.',
    })
  }
  else{
    return ({
      holder:"editorjs",
      tools: {
        header: {
          class: Header, 
          inlineToolbar: ['link'],
        }, 
        ListNum: { 
          class: ListNum, 
          inlineToolbar: true 
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        paragraph:{
          class: Paragraph,
          inlineToolbar: true,
        },
        image:{
          class: SimpleImage,
          inlineToolbar: true
        },
        video:{
          class: VideoEditor,
          inlineToolbar: true
        },
        file:{
          class: FileEditor,
          inlineToolbar: true
        },
        separator:{
          class: SeparatorEditor
        },
        audio:{
          class: AudioEditor
        },
        table:{
          class: TableEditor,
          inlineToolbar: true,
        },
        selectedText:{
          class: SelectedTextEditor,
          inlineToolbar: true,
        },
        strikethrough: {
          class: Strikethrough,
        },
      },
      placeholder: 'Нажмите Tab для открытия списка с блоками.',
    })
  }
}
export default configuration