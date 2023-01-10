import { API } from "@editorjs/editorjs";
import { url } from "../../../url";


class AudioEditor {

    data   :any;
    wrapper:any;
    readOnly:any;
    api : API
  
    static get toolbox() {
      return {
        title: 'Аудио',
        icon: `<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="33" height="33" fill="url(#pattern0)"/>
        <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_80_24" transform="scale(0.0104167)"/>
        </pattern>
        <image id="image0_80_24" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADpUlEQVR4nO2cy2oUQRSGP42Om+DC4F23hhgXohtREBFd+xDiTn0DxRdQguIb6MYrLr2CIl7AGEFx5Q0Vce1kZ8y46B68ps/prkqqOvN/cGCYrj7nr3NmeqqrqgeEEEIIIYQQQgghhBBCCCH+ZRswAbwCpoHegNt0mYuJMjfzRgc4D/zIoNO52gxwrsxVVDrA3Qw62Ba7Q+QinM+gU22zs40y/R+2UXy1UneobTYDjFvJXWo1AI4AQ4524k+GgMNWI08BDoRrGVgOWg2WOJx0geFwLQNJF1hZ1cBTgF4cLQNLZY49lyAxj6gAiVEBEqMCJEYFSIwKkBgVIDHLFijOc+AG8AD4Cnwq398MrAP2AoeAHQOqp5Kmk1GzwGVgtEasUeBKeW7sybFUeoJpEvQdsCsg5m7gfcPYuekJpm7Ah8CaCHFHgHsN4uemJ5g6we4TdyWoU/psmvwc9ATjDfQeWB0j4F+MAG9q6MhNTzCeILOEXWMtdlPvhzAnPcF4glyKEcjgqlNLbnqC8XzaPEO7FcBx4AnFXprp8vWx8pjFmENLjnqCsQJMOnxsBF5U+Jgq21hMtVBPMFaAk8b5K6ju7O+dtj55p1qoJxgrwD7j/OMOH307avja30I9wVgBthjnP3X46Ntjw9doC/UEYwWwdkx0HT761jV8DbdQTyUxpqM9Oyu8zBrHfzh8fI8hpMTSE5y/GAVYbxx/XcOX1XaVw8dIYIw6ba2+m8QogDVcu1DD10Xj+JjDh9Umph7PUDUY6xrnGfZ5xstT2BNnJx1+TiygniyGod4bn6pOe298Jh16ni2gnixuxLy3/h2KcfVjitFFF3hUvueZMt7p0NI3z1JiqJ5spiJ6FMt2g8Z1MirALMUU7aCwB/+3MRhvoA/EWfrLnRHgLRkWoEf8JcDc6FBsZamTk2DqBOtRLIKvjRE4M1qxKN+3dyyu34Q9FJfYJrkIpknQ/g/zVXx3r7kyBlyjeQ7MAizUI0ov+LUV8AvwmWIJMCeGgU3ABn5tTdwewW9ljvWM2PyjZ8RyRgVIjAqQGBUgMSpAYlSAxKgAiVEBEqMCJEYFSIwKkBhPAazteWJuvlkNPAX4ZDcRc/DRauApwK0IQgaVmzGcjKO/rWxiM8DWBvn+L+cy6FDbbKJRpuegQ/F3vKk71Ra7DSxvlOkKOhR/x6vL0dz2neKTHz35vzMOnAFeUu9pk8Vq3TIXp4l4zRdCCCGEEEIIIYQQQgghxOLhJ81MXQ4sB8OTAAAAAElFTkSuQmCC"/>
        </defs>
        </svg>
        `
      };
    }
    static get isReadOnlySupported() {
      return true;
    }

    constructor({data,readOnly,api}:any){
      this.data = data;
      this.api  = api;
      this.wrapper = undefined;
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapperAudio') 
        this._createEpigraph()
        return this.wrapper;
    }

    isFirstBlock() {
      return this.api.blocks.getCurrentBlockIndex();
    }


    _createEpigraph()
    {
      if(this.data.file)
      {

        const caption = document.createElement('div');
        const audio   = document.createElement('audio');    
        const p = document.createElement('p');

        audio.src = `${url}${this.data.file}`;
        audio.controls = true

        if(this.data.caption)
        {
          caption.innerHTML = this.data.caption;
          caption.classList.add('blockInput')
        }
        
        audio.classList.add('AudioSingle')

        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(audio);
        this.wrapper.appendChild(p)
        this.wrapper.appendChild(caption);

      } else {
        const button = document.createElement("button")
    
        button.addEventListener("click",()=>{
          this.api.blocks.delete(this.isFirstBlock())
        })
    
        button.classList.add("deleteBlockT")

        const input = document.createElement('input')
  
        input.placeholder = 'Paste an image URL...';
        input.type = "file"
        input.value = '';
        input.classList.add("inputAudioEditor")
  
        input.addEventListener("change",(e:any)=>{
            
          if(e.target.files[0].type.split('/')[0] != "audio")
          {
            return
          }

          let reader = new FileReader()
  
          reader.onload = () => {
            const caption = document.createElement('div');
            const audio   = document.createElement('audio');    
            const p = document.createElement('p');
    
            audio.src = reader.result as string;
            audio.controls = true
            p.innerText = "Описание"
            caption.contentEditable = "true";
            caption.innerHTML = '';
            caption.classList.add('blockInput')
            audio.classList.add('audioSingle')
    
            this.wrapper.appendChild(audio);
            this.wrapper.appendChild(p)
            this.wrapper.appendChild(caption);

            input.classList.remove(input.classList[0])
            input.classList.add("displayNone")
          };
    
          reader.readAsDataURL(e.target.files[0])
        })
  
        this.wrapper.appendChild(input)
        this.wrapper.appendChild(button)
      };
    }

    save(blockContent:any)
    {

      const audio = blockContent.getElementsByClassName('inputAudioEditor');
      const caption = blockContent.querySelectorAll('[contenteditable]');

      return {
        fileSave:audio[0].files[0],
        file: false,
        caption: caption[0].innerHTML || ''
      } 
      
    }
}
export default AudioEditor