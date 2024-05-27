import React from 'react'
import Heading from '../heading/Heading'

const Friends = () => {
  return (
    <>
       <div className='userlist_main'>
         <Heading text="Friends"/>
         <div className='item_main'>
          {[0,1].map((item , index)=>(
            <div key={index} className='useritem'>
                <div className="userimg">
                  
                </div>
                <div className="userinfo">
                    <div>
                      <h4>Arop dhar</h4>
                      <p>Mern 2306</p>
                    </div>
                    <div style={{display: "flex" , alignItems: "center" , gap: "10px"}}>
                        <button className='addbtn'>Block</button>
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

export default Friends
