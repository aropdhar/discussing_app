import React from 'react'
import Heading from '../../component/heading/Heading'

const FriendRequest = () => {
  return (
    <>
      <div className='userlist_main'>
         <Heading text="Friend Request"/>
         <div className='item_main'>
          {[0,1].map((item , index)=>(
            <div key={index} className='useritem'>
                <div className="userimg">
                  
                </div>
                <div className="userinfo">
                    <div>
                      <h4>Arop Dhar</h4>
                      <p>Mern 2306</p>
                    </div>
                    <div style={{display: "flex" , alignItems: "center" , gap: "10px"}}>
                        <button className='addbtn'>Confirm</button>
                        <button className='addbtn'>Delete</button>
                    </div>
                </div>
            </div>
          ))

          }
         </div>
      </div>
    </>
  )
}

export default FriendRequest
