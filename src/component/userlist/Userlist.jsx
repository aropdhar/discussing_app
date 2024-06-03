import React, { useEffect, useState } from 'react'
import './userlist.css'
import Heading from '../heading/Heading'
import { getDatabase, ref, onValue , push, set, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Userlist = () => {
  
  const data = useSelector((state) => state.logedindatauser.value)
  const db = getDatabase();
  const [userarr , setUserarr] = useState([]);
  const [freqlist , setFreqlist] = useState([]);
  const [friends , setFriends] = useState([]);
  
// all user list

  useEffect(()=>{
    const addreqRef = ref(db, 'users');
    onValue(addreqRef, (snapshot) => {
      
      let arr = [];

      snapshot.forEach((item)=>{
        if(item.key != data.uid){   
          arr.push({...item.val() , id: item.key});
        }
        
      });
      
      setUserarr(arr);
    });
  },[])

// friend request list

  useEffect(()=>{
    const freqref = ref(db, 'friendRequest');
    onValue(freqref, (snapshot) => {
      
      let arr = [];

      snapshot.forEach((item)=>{
        if(data.uid == item.val().whosendid || data.uid == item.val().whoreceiveid){   
          arr.push(item.val().whosendid + item.val().whoreceiveid);
        }
      });
      
      setFreqlist(arr);
    });
  },[])

  // friend list
  
  useEffect(()=>{
    const addreqRef = ref(db, 'friends');
    onValue(addreqRef, (snapshot) => {
      
      let arr = [];

      snapshot.forEach((item)=>{
        if(item.val().senderid == data.uid || item.val().receiveid == data.uid){   
          arr.push(item.val().senderid + item.val().receiveid);
        }
      });
      
      setFriends(arr);
    });
  },[])


 let handleCancel = (cancelinfo) =>{

  remove(ref(db, 'friendRequest/' + cancelinfo.id)).then(()=>{
    console.log("OK");
  })

 }





  let handlefreq = (freqinfo) =>{

    set(push(ref(db, 'friendRequest')), {
       whosendid: data.uid,
       whosendemail: data.email,
       whosendname: data.displayName,
       whoreceiveid: freqinfo.id,
       whoreceiveemail: freqinfo.email,
       whoreceivename: freqinfo.DisplayName,

    })

  }
  

return (
  <>
    <div className='userlist_main'>
        <Heading text="User List"/>
          <div className='item_main'>
            {userarr.length > 0 

            ?
            
            userarr.map((item , index)=>(
              <div key={index} className='useritem'>
                
                  <div className="userimg">
                    
                  </div>
                  <div className="userinfo">
                      <div>
                        <NavLink to={`/profile/${item.id}`}>
                           <h4>{item.DisplayName}</h4>
                        </NavLink>
                        <p>Mern 2306</p>
                      </div>
                      {freqlist.includes(data.uid + item.id) || freqlist.includes(item.id + data.uid)

                      ?
                      
                        <button onClick={()=>handleCancel(item)} className='addbtn'>Cancel</button>
                      
                      :
                      
                       friends.includes(data.uid + item.id) || friends.includes(item.id + data.uid) 
                       ?

                        <button className='addbtn'>Friends</button>
                       :

                        <button onClick={()=>handlefreq(item)} className='addbtn'>Add Friend</button>

                      }
                  </div>
              </div>
            ))

            :

             <Alert severity="info">No UserList Found</Alert>

            }
          </div>
    </div>

  </>
  )
}

export default Userlist
