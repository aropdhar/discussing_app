import { Avatar } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import "./layout.css"

const Sidebar = () => {
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
              <div className='sidebar_menu'>
                <ul>
                  <li><NavLink to='/home'><IoHomeOutline /></NavLink></li>
                  <li><NavLink to='/message'><AiOutlineMessage /></NavLink></li>
                  <li><NavLink to='/notification'><IoIosNotificationsOutline /></NavLink></li>
                  <li><NavLink to='/setting'><CiSettings /></NavLink></li>
                </ul>
              </div>
              <div className='sidebar_logout'>
                <IoIosLogOut />
              </div>
          
        </div>
      </div>
    </>
  )
}

export default Sidebar
