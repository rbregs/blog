import React, { useState } from 'react';
import style from './CreatePost.module.css';
import { Navigate } from 'react-router-dom';
import Editor from '../../Editor';



export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file,setFile] = useState('');
  const [redirect,setRedirect] = useState(false)



 
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ title, summary, content, file });
    const data = new FormData();
    data.set('title' ,title)
    data.set('summary',summary)
    data.set('content',content)
    data.set('file',file[0])

    const response =  await fetch('http://localhost:3000/post',{
      method:'POST',
      body: data,
      credentials:'include',
    })

    if (response.ok) {
      setRedirect(true)
    }
  }

  if (redirect) {
   return  <Navigate to={'/'}/>
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.titleSummary}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={handleSummaryChange}
          />
        </div>

        <Editor value={content} onchange={setContent}/>
        <div className={style.inputSave}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Create Post</button>
        </div>

      </form>
    </div>
  );
}
