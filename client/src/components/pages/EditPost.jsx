import React, {useEffect, useState} from 'react'
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../../Editor';
import style from './EditPost.module.css'

export default function EditPost() {
    const {id}= useParams()
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file,setFile] = useState('');
    const [cover,setCover] = useState('')
    const [redirect,setRedirect] = useState(false)
    

    useEffect(()=> {
        fetch('http://localhost:3000/post/' + id)
        .then(response =>{
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setContent(postInfo.content)
                setSummary(postInfo.summary)
            })
        })

    },[])

 

    async function updatePost(e) {
        e.preventDefault();
      
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
      
        
        if (file && file[0]) {
          data.set('file', file[0]);  
        }
      
        const response = await fetch('http://localhost:3000/post/', {
          method: 'PUT',
          body: data,
          credentials: 'include'
        });
      
        if (response.ok) {
          setRedirect(true);  
        }
      }
      

      if (redirect) {
        return  <Navigate to={'/post/' + id}/>
       }

      const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };
    
      const handleSummaryChange = (e) => {
        setSummary(e.target.value);
      };
    
      const handleFileChange = (e) => {
        setFile(e.target.files);
      };



    return (
        <div className={style.container}>
          <form className={style.form} onSubmit={updatePost}>
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
    
            <Editor onchange={setContent}
                    value={content}    />
    
            <div className={style.inputSave}>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Update Post</button>
            </div>
    
          </form>
        </div>
    )
}

