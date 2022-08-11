import React from 'react'
import style from './Card.module.css'
import myImg from './raya.jpg'
import Image from 'next/image'
import {motion}  from 'framer-motion'
import defaultImg from './default.webp'
const Card = ({card_type , id,imgUrl}) => {
    const cardStyle = {
        large : style.card_1,
        medium : style.card_2,
        small :  style.card_3
    }
 const animate1 = {
  scaleY:1.05 , zIndex:100
 }
 const animate2 = {
  scale:1.08 , zIndex:100
 }
  return (
    <motion.div className={`${style.card} ${cardStyle[card_type]}`} whileHover={id==0 ? animate1 : animate2}>
        <Image src={imgUrl || defaultImg.src} layout='fill' objectFit='cover'/>
    </motion.div>
  )
}

export default Card