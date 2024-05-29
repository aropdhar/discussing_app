import React, { useEffect, useState } from 'react'
import Heading from '../../component/heading/Heading'
import { getDatabase, ref, onValue , push, set, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';

const FriendRequest = () => {

  const db = getDatabase();
  const data = useSelector((state) => state.logedindatauser.value)
  const [friendreq , setFriendreq] = useState([])

  useEffect(()=>{
    const freqRef = ref(db, 'friendRequest');
     onValue(freqRef, (snapshot) => {
      
      let arr = [];

      snapshot.forEach((item)=>{
        if(data.uid == item.val().whoreceiveid){   
          arr.push({...item.val() , id: item.key});
        }
      });
      
      setFriendreq(arr);
    });
  },[])

  let handledelete = (deleteinfo) =>{
    
    remove(ref(db, 'friendRequest/' + deleteinfo.id)).then(()=>{
      
      console.log("delete Successfully");

    });

  }

  let handleconfirm = (confirminfo) =>{
      console.log(confirminfo);

      set(push(ref(db, 'friends')), {

        senderid: confirminfo.whosendid,
        senderemail: confirminfo.whosendemail,
        sendername: confirminfo.whosendname,
        receiveid: data.uid,
        receivename: data.displayName,
        receiveemail: data.email,

      }).then(()=>{
        remove(ref(db, 'friendRequest/' + confirminfo.id)).then(()=>{
      
          console.log("Friend Request Confirm Successfully");
    
        });
      });

  }

  return (
    <>
      <div className='userlist_main'>
         <Heading text="Friend Request"/>
         <div className='item_main'>
          {friendreq.length > 0 
          ?
          friendreq.map((item , index)=>(
            <div key={index} className='useritem'>
                <div className="userimg">
                  
                </div>
                <div className="userinfo">
                    <div>
                      <h4>{item.whosendname}</h4>
                      <p>Mern 2306</p>
                    </div>
                    <div style={{display: "flex" , alignItems: "center" , gap: "10px"}}>
                        <button onClick={()=>handleconfirm(item)} className='addbtn'>Confirm</button>
                        <button onClick={()=>handledelete(item)} className='addbtn'>Delete</button>
                    </div>
                </div>
            </div>
          ))
          :
            <Alert severity="info">No Request Found</Alert>
          }
         </div>
      </div>
    </>
  )
}

export default FriendRequest
