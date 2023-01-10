import { ChangeEvent , SetStateAction , Dispatch} from 'react';

interface props
{
    e : ChangeEvent;
    setPreview : Dispatch<SetStateAction<string>>;
    setFile : Dispatch<SetStateAction<File | undefined>> ;
}

export const setImagePreview = ({ e , setPreview , setFile } : props ) =>{
    
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    setFile(file)

    let reader = new FileReader()

    reader.onload = function() {
        setPreview(reader.result as string);
    };

    reader.readAsDataURL(file)
    
}