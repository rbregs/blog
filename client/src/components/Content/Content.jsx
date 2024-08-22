import React from 'react'
import style from './Content.module.css'

export default function Content() {
  return (
    <div className="container">
        <div className={style.content}>
            <img src="https://www.reuters.com/resizer/v2/J6LRZYSPMVMW3ETSE7SULXPVBQ.jpg?auth=4e8e081ae65e1cc0c60597a5978400b4b2c25519b6c1f006a2302206c5616b68&width=960&quality=80" alt="" />
            <div className={style.textContent}>
                <h2>THIS IS FOR TITLE</h2>
                <p className={style.info}>
                    <span >Author</span>
                    <time></time>
                </p>
              
                <p>this is sample paragraph this is sample paragraphthis is sample paragraph
                        this is sample paragraph
                        this is sample paragraph
                        this is sample paragraph
                        this is sample paragraphthis is sample paragraph
                        this is sample paragraph

                        this is sample paragraph
                </p>
            </div>
        </div>
        <div className={style.content}>
            <img src="https://www.reuters.com/resizer/v2/J6LRZYSPMVMW3ETSE7SULXPVBQ.jpg?auth=4e8e081ae65e1cc0c60597a5978400b4b2c25519b6c1f006a2302206c5616b68&width=960&quality=80" alt="" />
            <div className={style.textContent}>
                <h2>THIS IS FOR TITLE</h2>
                <p className={style.info}>
                    <span >Author</span>
                    <time></time>
                </p>
                <p>this is sample paragraph this is sample paragraphthis is sample paragraph
                        this is sample paragraph
                        this is sample paragraph
                        this is sample paragraph
                        this is sample paragraphthis is sample paragraph
                        this is sample paragrapdsdasdasdadsdadsh

                        this is sample paragraph
                </p>
            </div>
        </div>
    </div>
  )
}
