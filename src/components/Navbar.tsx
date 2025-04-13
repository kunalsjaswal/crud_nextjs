import React from 'react'
import style from '../styles/navbar.module.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className={ style.navbar }>
      <h2 style={{margin: 0}}>CRUD</h2>
      <Link  href={'add-topic'} className={ style.add_btn }>
        Add Topic
      </Link>
    </div>
  )
}

export default Navbar