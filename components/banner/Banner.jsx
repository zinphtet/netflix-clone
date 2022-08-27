import React from 'react'
import style from './Banner.module.css'
import { RiPlayFill } from "react-icons/ri";
import { useRouter } from 'next/router';
// 4zH5iYM4wJo
const Banner = () => {
  const vid = '4zH5iYM4wJo'
  const router = useRouter()
  const handlePlay = ()=>{
    router.push(`/video/${vid}`)
  }
  return (
    <div className={`${style.banner} container`}>
       <h3 className={style.netflix}>NETFLIX</h3>
       <p className={style.movie_title}>
       Cliffod The big red dog (2021)
       </p>
       <p className={style.info}>
        [ HD ] | Netflix
       </p>
       <button className={style.play_btn} onClick={handlePlay}> <RiPlayFill/> Play</button>
    </div>
  )
}

export default Banner