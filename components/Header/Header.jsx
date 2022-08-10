import React from 'react'
import style from './Header.module.css'
import Navbar from '../Navbar/Navbar'
import Banner from '../banner/Banner'
import Image from 'next/image'
import clifford from './clifford.webp'

const Header = () => {
  const backStyle = {
    backgroundImage : `url(${clifford.src})`
  }
  console.log("My Image" , clifford)
  return (
    <div className={style.header} style={backStyle}>
              <Navbar/>
              <Banner/>
              {/* <div className={style.back}>
              <div className={style.back_img}>
                 <Image src='/banner.jpg' layout='fill' />
                 <img src="./banner3.jpg" alt="Banner Image" />
              </div>
              </div> */}
           
    </div>
  )
}

export default Header