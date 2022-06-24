import React, {useCallback} from "react"
import Dropzone from "react-dropzone"
import "./DropBox.css"
import { useState } from "react"

export const DropBox = ({imageKey,setImageKey})=>{

  const [imageAdded,setImageAdded] = useState(false)

  const handleDragEnter = (e)=>{
    console.log("entering")
    e.preventDefault();
    e.target.classList.add("highlight")
  }
  const handleDragLeave = (e)=>{
    e.preventDefault()
    e.target.classList.remove("highlight")
  }

  const handleDragOver = (e)=>{
    console.log("over it")
    e.stopPropagation();
    // e.target.classList.remove("highlight")
    e.preventDefault()
  }

  const uploadFile = async (file)=>{
    let url = '/data/upload'
    let formData = new FormData()
  
    formData.append('image', file)
  
    const resp = await fetch(url, {
      method: 'POST',
      body: formData
    });
    const data= await resp.json()
    setImageAdded(true);
    setImageKey(data.imagePath.split("/")[2])
    return data
  }

  const handleFiles = async (files)=>{
    let data;
    for (let i = 0;i<files.length;i++){
      data = await uploadFile(files[i])
    }
    console.log(data);
    return data
  }

  function handleDrop(e) {
    e.preventDefault()
    if(imageAdded){
      return
    }
    let dt = e.dataTransfer
    let files = dt.files  
    handleFiles(files)
    e.target.classList.remove("highlight")

  }

  if(imageAdded&&imageKey){
    return(
      <div className="dropped-image-cont"><img className="dropped-image" src={`/images/${imageKey}`}/></div>
    )
  }
  return(
    <>
    <div className="drop-zone" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
      Drop image file here
       </div>
       <span draggable={true}>Drag Me</span>
    </>
  )
}

