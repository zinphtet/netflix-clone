import React ,{useState , useEffect} from 'react'
import style from './Navbar.module.css'
import Image from 'next/image'
import logo from '../../public/netflix.svg'
import { RiArrowDropDownLine , RiMenu4Line,RiCloseCircleLine } from "react-icons/ri";
import Link from 'next/link'
import { useRouter } from 'next/router'
import {m} from '../../magic/magic'
const Navbar = () => {
   const router = useRouter()

    const [showLogout , setShowLogout] = useState(false)
    const [menu , setMenu]  = useState(false)
    const [email , setEmail] = useState('')

    const logBtn = ()=>{
        setShowLogout(!showLogout)
       
    }
    const handleSignOut = async (e)=>{
       e.preventDefault()
       try {
         await m.user.logout();
         // console.log(await m.user.isLoggedIn()); // => `false`
       
         router.push('/login')
       

       } catch(err) {
         // Handle errors if required!
         console.error("Error occur When Logout ",err.message)
       }
      
    }

   useEffect(()=>{
     
      window.addEventListener('scroll',()=>{
         setMenu(false)
      })
      const fetchEmail = async ()=>{
         try {
            const { email } = await m.user.getMetadata();
            setEmail(email)
          } catch(err) {
            // Handle errors if required!
            console.error("Error from navbar fetch MetaData" , err.message)
          }
      }

     fetchEmail()
   },[])

  return (
    <div className={` ${style.navbar}`}>
       <div className={`container ${style.inner_nav}`}>
          <div className={style.left}>
            <div className={style.logo} onClick={()=>router.push('/')}>
               <Image src={logo} layout='fill' objectFit='contain' alt='netflix logo'/>
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
               <p onClick={logBtn} title='click to show signout btn'>{email} <RiArrowDropDownLine/> </p>
               {
                showLogout &&(
                    <button className={style.logout} onClick={handleSignOut}>Sign Out</button>
                )
               }
              
          </div>
          </div>
    </div>
  )
}

export default Navbar