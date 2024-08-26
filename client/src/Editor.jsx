import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

export default function Editor({value,onchange}) {
  return (
    <>
     <div>Editor</div>
        <ReactQuill
        value={value}
        onChange= {onchange}
        modules={modules}
        />
    </>
   

  
  )
}
