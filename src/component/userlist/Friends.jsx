import React, { useEffect, useState } from 'react'
import Heading from '../heading/Heading'
import { getDatabase, ref, onValue , push, set, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';

const Friends = () => {
  
  const db = getDatabase();
  const [friendlist , setFriendList] = useState([])
  const data = useSelector((state) => state.logedindatauser.value)
  

   useEffect(()=>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
     
     let arr = [];

     snapshot.forEach((item)=>{

       if(item.val().senderid == data.uid || item.val().receiveid == data.uid){ 
         arr.push({...item.val() , id: item.key});
      }
    });
     
     setFriendList(arr);
   });
   },[])

   let handleblock = (blockinfo) =>{

     set(push(ref(db, 'blocklist')), {
      blockkorcheid: data.uid,
      blockkorcheemail: data.email,
      blockkorchename: data.displayName,
      blockkhaiceid: blockinfo.senderid,
      blockkhaiceemail: blockinfo.senderemail,
      blockkhaicename: blockinfo.sendername,
   }).then(()=>{
    
    remove(ref(db, 'friends/' + blockinfo.id)).then(()=>{
      
      console.log("ok");

    });
   });

   }

   let handleunfriend = (unfriendinfo) =>{

    remove(ref(db, 'friends/' + unfriendinfo.id))
      
   }

  return (
    <>
       <div className='userlist_main'>
         <Heading text="Friends"/>
         <div className='item_main'>
          {friendlist.length > 0 
          ?
          friendlist.map((item , index)=>(
            <div key={index} className='useritem'>
                <div className="userimg">
                  
                </div>
                <div className="userinfo">
                    <div>
                      <h4>{item.receiveid == data.uid
                      ?
                      item.sendername

                      :

                      item.receivename

                      }</h4>
                      <p>Mern 2306</p>
                    </div>
                    <div style={{display: "flex" , alignItems: "center" , gap: "10px"}}>
                        <button onClick={()=>handleunfriend(item)} className='addbtn'>Unfriend</button>
                        <button onClick={()=>handleblock(item)} className='addbtn'>Block</button>

                    </div>
                </div>
            </div>
          ))
           :
           <Alert severity="info">No Friends List Found</Alert>
          }
         </div>
      </div>
    </>
  )
}

export default Friends
