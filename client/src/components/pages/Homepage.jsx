import React, { useEffect, useState } from 'react'
import Content from '../Content/Content'

export default function Homepage() {
  const [posts,setPosts] = useState([])

  useEffect(() =>{
    fetch('http://localhost:3000/post').then(response =>{
      response.json().then(posts =>{
        setPosts(posts)
      })
    })

  },[])
  return (
    <>
      {posts.length > 0 && posts.map (post => (
        <Content{...post} />
      ))}
    </>
    
  )
}
