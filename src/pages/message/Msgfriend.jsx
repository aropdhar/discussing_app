import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue , push, set, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';
import Heading from '../../component/heading/Heading';
import { userMsgName } from '../../authslice/activeMsgSlice';

const Msgfriend = () => {

    const db = getDatabase();
    const [friendlist , setFriendList] = useState([])
    const data = useSelector((state) => state.logedindatauser.value)
    const activeuserdata = useSelector((state) => state.usermsgdata.value)
    const dispatch = useDispatch();
    

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
      
       let handleMsgname = (msginfo) =>{
        
          dispatch(userMsgName(msginfo));

       }

  return (
    <>
       <div className='userlist_main msgbox'>
         <Heading text="Friends"/>
         <div className='item_main'>
          {friendlist.length > 0 
          ?
          friendlist.map((item , index)=>(
            <div onClick={()=>handleMsgname(item)} key={index} className='useritem msg'>
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

export default Msgfriend
