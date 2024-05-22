import { Avatar } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import "./layout.css"
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginstore } from '../../authslice/authSlice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Sidebar = () => {
   
  const navigate = useNavigate();
  const auth = getAuth();

  const data = useSelector((state) => state?.logedindatauser?.value)
  const dispatch = useDispatch()
  console.log(data);

  let handlesignout = () =>{
    signOut(auth).then(() => {

      navigate("/");
      localStorage.removeItem("logedinstore");
      dispatch(loginstore(null)) 

    }).catch((error) => {
      // An error happened.
    });
    
  }

  return (
    <>
      <div className='sidebar_main'>
        <div className='sidebar_card'>
              <div>
                  <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 100, height: 100 }}
                  />
              </div>
              <div className='sidebar_menu' style={{width: "100%"}}>
                <p style={{textAlign: "center" , marginBottom: "10px" , fontSize: "18px" , color: "#fff"}}>
                  {/* {data?.displayName} */}
                 {data ? 

                    data.displayName
                 :
                   <Skeleton style={{width: "70%" , margin: "0  auto" , height: "40px"}}/>
                 }

                </p>
                <ul>
                  <li><NavLink to='/home'><IoHomeOutline /></NavLink></li>
                  <li><NavLink to='/message'><AiOutlineMessage /></NavLink></li>
                  <li><NavLink to='/notification'><IoIosNotificationsOutline /></NavLink></li>
                  <li><NavLink to='/setting'><CiSettings /></NavLink></li>
                </ul>
              </div>
              <div onClick={handlesignout} className='sidebar_logout'>
                <IoIosLogOut />               
              </div>
          
        </div>
      </div>
    </>
  )
}

export default Sidebar
