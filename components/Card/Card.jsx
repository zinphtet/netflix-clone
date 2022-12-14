import React ,{useState , useEffect}from 'react'
import style from './Card.module.css'
import myImg from './raya.jpg'
import Image from 'next/image'
import { motion } from 'framer-motion'
import defaultImg from './default.webp'
import Link from 'next/link'
const Card = ({ card_type, id, imgUrl, videoId }) => {
  
  const [imgSrc , setImgSrc] = useState(imgUrl)

  const cardStyle = {
    large: style.card_1,
    medium: style.card_2,
    small: style.card_3
  }

  const animate1 = {
    scaleY: 1.05, zIndex: 100
  }
  const animate2 = {
    scale: 1.08, zIndex: 100
  }
  // || notFoundImag || defaultImg.src
  const notFoundImag = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
const handleImgError = ()=>setImgSrc(notFoundImag)
  return (
    <Link href={`/video/${videoId}`}>
      <a>
        <motion.div className={`${style.card} ${cardStyle[card_type]}`} whileHover={id == 0 ? animate1 : animate2}>
          <Image src={imgSrc} layout='fill' objectFit='cover' alt='video img' onError={handleImgError} />
        </motion.div>
      </a>
    </Link>
  )
}

export default Card