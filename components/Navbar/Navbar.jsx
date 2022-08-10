import React ,{useState} from 'react'
import style from './Navbar.module.css'
import Image from 'next/image'
import logo from '../../public/netflix.svg'
import { RiArrowDropDownLine , RiMenu4Line,RiCloseCircleLine } from "react-icons/ri";
import { useRouter } from 'next/router'
import Link from 'next/link'
const Navbar = () => {
    const [showLogout , setShowLogout] = useState(false)
    const [menu , setMenu]  = useState(false)
    const logBtn = ()=>{
        setShowLogout(!showLogout)
    }
   
  return (
    <div className={` ${style.navbar}`}>
       <div className={`container ${style.inner_nav}`}>
          <div className={style.left}>
            <div className={style.logo}>
               <Image src={logo} layout='fill' objectFit='contain'/>
            </div>
            
          </div>
          <div className={style.menu} onClick={()=>setMenu(true)}>
               < RiMenu4Line/>
          </div>
          <div className={`${style.right} ${menu ? style.showNav :'' } `} >
             <div className={style.navlinks}>
                <Link href='/'>
                <a >Home</a>
                </Link>
                <Link href='/mylist'>
                <a >My List</a>
                </Link>
                 <div className={style.close} onClick={()=>setMenu(false)}>
                    <RiCloseCircleLine/>
                 </div>
              </div>
               <p onClick={logBtn}>zph@gmail.com <RiArrowDropDownLine/> </p>
               {
                showLogout &&(
                    <button className={style.logout}>Sign Out</button>
                )
               }
              
          </div>
          </div>
    </div>
  )
}

export default Navbar