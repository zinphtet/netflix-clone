import React from 'react'
import style from './Header.module.css'
import Navbar from '../Navbar/Navbar'
import Banner from '../banner/Banner'
import Image from 'next/image'

const Header = () => {
  // const backStyle = {
  //   backgroundImage : `url(${Banner})`
  // }
  return (
    <div className={style.header} >
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