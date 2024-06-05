import React from 'react'
import Msgfriend from './Msgfriend'
import Msgbox from './Msgbox'


const Message = () => {
  

  return (
    <>
    <div style={{display: "flex" , alignItems: "start" , gap: "20px"}}>
        <div>
          <Msgfriend/>
        </div>
        <div style={{marginTop: "30px"}}>
           <Msgbox/>
        </div>
    </div>
    </>
  )
}

export default Message
