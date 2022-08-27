import React from 'react'
import style from './Header.module.css'
import Navbar from '../Navbar/Navbar'
import Banner from '../banner/Banner'
import clifford from './clifford.webp'

const Header = () => {
  const backStyle = {
    backgroundImage : `url(${clifford.src})`
  }
  
  return (
    <div className={style.header} style={backStyle}>
              <Navbar/>
              <Banner/>

           
    </div>
  )
}

export default Header