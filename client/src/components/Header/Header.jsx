import React from 'react'
import style from './Header.module.css'

export default function Header() {
  return (
    <header>
        <nav className={style.container}>
            <a href="" className={style.logo}>Food Blog</a>
            <ul className={style.list}>
                <li><a href="">Login</a></li>
                <li><a href="">Register</a></li>
            </ul>
        </nav>
    </header>
  )
}
