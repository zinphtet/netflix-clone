import React from 'react'
import style from './Banner.module.css'
import { RiPlayFill } from "react-icons/ri";
const Banner = () => {
  return (
    <div className={`${style.banner} container`}>
       <h3 className={style.netflix}>NETFLIX</h3>
       <p className={style.movie_title}>
       Cliffod The big red dog (2011)
       </p>
       <p className={style.info}>
        [ HD ] | Netflix
       </p>
       <button className={style.play_btn}> <RiPlayFill/> Play</button>
    </div>
  )
}

export default Banner