/**
 * Build styles
 */
 require('./index.css').toString();

 /**
  * Underline Tool for the Editor.js
  *
  * Allows to wrap inline fragment and style it somehow.
  */
 class Underline {
   /**
    * Class name for term-tag
    *
    * @type {string}
    */
   static get CSS() {
     return 'cdx-underline';
   };
 
   /**
    * @param {{api: object}}  - Editor.js API
    */
   constructor({ api }) {
     this.api = api;
 
     /**
      * Toolbar Button
      *
      * @type {HTMLElement|null}
      */
     this.button = null;
 
     /**
      * Tag represented the term
      *
      * @type {string}
      */
     this.tag = 'U';
 
     /**
      * CSS classes
      */
     this.iconClasses = {
       base: this.api.styles.inlineToolButton,
       active: this.api.styles.inlineToolButtonActive,
     };
   }
 
   /**
    * Specifies Tool as Inline Toolbar Tool
    *
    * @returns {boolean}
    */
   static get isInline() {
     return true;
   }
 
   /**
    * Create button element for Toolbar
    *
    * @returns {HTMLElement}
    */
   render() {
     this.button = document.createElement('button');
     this.button.type = 'button';
     this.button.classList.add(this.iconClasses.base);
     this.button.innerHTML = this.toolboxIcon;
 
     return this.button;
   }
 
   /**
    * Wrap/Unwrap selected fragment
    *
    * @param {Range} range - selected fragment
    */
   surround(range) {
     if (!range) {
       return;
     }
 
     const termWrapper = this.api.selection.findParentTag(this.tag, Underline.CSS);

     
     console.log(`селек ${termWrapper}`);

     console.log(`тег   ${this.tag}`);
     console.log(`css   ${Underline.CSS}`);

     console.log(`range ${range}`);
 
     /**
      * If start or end of selection is in the highlighted block
      */
     if (termWrapper) {
       this.unwrap(termWrapper);
     } else {
       this.wrap(range);
     }
   }
 
   /**
    * Wrap selection with term-tag
    *
    * @param {Range} range - selected fragment
    */
   wrap(range) {
     /**
      * Create a wrapper for highlighting
      */
     const u = document.createElement(this.tag);
 
     u.classList.add(Underline.CSS);
 
     /**
      * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
      *
      * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
      *
      * // range.surroundContents(span);
      */
     u.appendChild(range.extractContents());
     range.insertNode(u);

     console.log(u);
 
     /**
      * Expand (add) selection to highlighted block
      */
     this.api.selection.expandToTag(u);
   }
 
   /**
    * Unwrap term-tag
    *
    * @param {HTMLElement} termWrapper - term wrapper tag
    */
   unwrap(termWrapper) {
     /**
      * Expand selection to all term-tag
      */
     this.api.selection.expandToTag(termWrapper);
 
     const sel = window.getSelection();
     const range = sel.getRangeAt(0);
 
     const unwrappedContent = range.extractContents();
 
     /**
      * Remove empty term-tag
      */
     termWrapper.parentNode.removeChild(termWrapper);
 
     /**
      * Insert extracted content
      */
     range.insertNode(unwrappedContent);
 
     /**
      * Restore selection
      */
     sel.removeAllRanges();
     sel.addRange(range);
   }
 
   /**
    * Check and change Term's state for current selection
    */
   checkState() {
     const termTag = this.api.selection.findParentTag(this.tag, Underline.CSS);
 
     this.button.classList.toggle(this.iconClasses.active, !!termTag);
   }
 
   /**
    * Get Tool icon's SVG
    *
    * @returns {string}
    */
   get toolboxIcon() {
     return `<svg width="25" height="31" viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M12.5 24.1111C18.4107 24.1111 23.2143 19.4783 23.2143 13.7778V0H18.75V13.7778C18.75 17.1017 15.9464 19.8056 12.5 19.8056C9.05357 19.8056 6.25 17.1017 6.25 13.7778V0H1.78571V13.7778C1.78571 19.4783 6.58929 24.1111 12.5 24.1111ZM0 27.5556V31H25V27.5556H0Z" fill="black"/>
     </svg>
     `;
   }
 
   /**
    * Sanitizer rule
    *
    * @returns {{u: {class: string}}}
    */
   static get sanitize() {
     return {
       u: {
         class: Underline.CSS,
       },
     };
   }
 }
 
 module.exports = Underline;