import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { MdEmojiEmotions } from 'react-icons/md'
import { useSelector } from 'react-redux'

const Msgbox = () => {
     
    const data = useSelector((state) => state.logedindatauser.value)
    const activeuserdata = useSelector((state) => state.usermsgdata.value)
    const [msgvalue , setMsgvalue] = useState("")
    
    let handlemsg = () =>{
        console.log(msgvalue);
    }

  return (
    <>
    {!activeuserdata
        ?
            <div style={{margin: "100% 100%", width: "100%"}}>
                <h1>Please Select a User</h1>
            </div>
        :
            <div className="msg_main">
                <div className="msg_heading">
                    <div className="img_box"></div>
                    <div className='msg_heading_title'>
                        <h1>
                        {activeuserdata.receiveid == data.uid 

                        ?
                        activeuserdata.sendername

                        :

                        activeuserdata.receivename
                        }</h1>
                        <p>Active Now</p>
                    </div>
                </div>
                <div className="msg_body">
                    <div className="sendmsg_main">
                        <p className='sendmsg'>Hello</p>
                    </div>
                    
                    <div className="receivemsg_main">
                        <p className='receivemsg'>Hello</p>
                    </div>
                  
                    <div className="sendmsg_main">
                        <p className='sendmsg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dolor molestias molestiae, at dignissimos minima a voluptate assumenda accusantium accusamus numquam excepturi temporibus expedita ad ipsa fugiat, quidem cumque sed.</p>
                    </div>
                    <div className="receivemsg_main">
                        <p className='receivemsg'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis natus amet quia dicta et ratione nisi alias. Atque rerum ducimus quos obcaecati porro quod perferendis voluptas. Quod deleniti officia libero.</p>
                    </div>
                    <div className="sendmsg_main">
                        <p className='sendmsg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dolor molestias molestiae, at dignissimos minima a voluptate assumenda accusantium accusamus numquam excepturi temporibus expedita ad ipsa fugiat, quidem cumque sed.</p>
                    </div>
                    <div className="receivemsg_main">
                        <p className='receivemsg'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis natus amet quia dicta et ratione nisi alias. Atque rerum ducimus quos obcaecati porro quod perferendis voluptas. Quod deleniti officia libero.</p>
                    </div>
                    <div className="sendmsg_main">
                        <p className='sendmsg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dolor molestias molestiae, at dignissimos minima a voluptate assumenda accusantium accusamus numquam excepturi temporibus expedita ad ipsa fugiat, quidem cumque sed.</p>
                    </div>
                </div>
                <div className="footer_section">
                      <MdEmojiEmotions className='footer_Emoji'/>

                       <input onChange={(e)=>setMsgvalue(e.target.value)} type="text" placeholder='Enter Your Message'/>
                       {msgvalue.length > 0 &&

                        <IoIosSend onClick={handlemsg} className='footer_send_btn'/>

                       }
                </div>
            </div>
    }
    </>
  )
}

export default Msgbox
