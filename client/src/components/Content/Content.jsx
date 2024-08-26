import React from 'react';
import style from './Content.module.css';
import { format } from 'date-fns'; 
import {Link} from   'react-router-dom'

export default function Content({ _id,title, summary, content, cover, createdAt,author }) {
  return (
    <div className={style.container}> 
      <div className={style.content}>
        <Link to={`/post/${_id}`}>
            <img src={'http://localhost:3000/' +cover} alt={title} /> 
        </Link>
        <div className={style.textContent}>
        <Link to={`/post/${_id}`} className={style.postLink}>
            <h2>{title}</h2>
        </Link>
       
          <p className={style.info}> 
            <span> {author.username} </span>
            <time>{format(new Date(createdAt), 'dd MMMM yyyy HH:mm')}</time> 
          </p>
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
}
