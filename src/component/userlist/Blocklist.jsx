import React, { useEffect, useState } from 'react'
import Heading from '../heading/Heading'
import { getDatabase, ref, onValue , push, set, remove } from "firebase/database";
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'

const Blocklist = () => {

    const db = getDatabase();
    const [blocklist , setBlocklist] = useState([])
    const data = useSelector((state) => state.logedindatauser.value)

    useEffect(()=>{
        const addreqRef = ref(db, 'blocklist');
        onValue(addreqRef, (snapshot) => {
          
          let arr = [];
    
          snapshot.forEach((item)=>{
            if(data.uid == item.val().blockkhaiceid || item.val().blockkorcheid == data.uid ){ 
                arr.push({...item.val() , id: item.key});
            }
             
          });
          
          setBlocklist(arr);
        });
      },[])

  
 let handleunblock = (unblockinfo) =>{
    
    remove(ref(db, 'blocklist/' + unblockinfo.id)).then(()=>{
      console.log("ok");
    })

 }

  return (
    <>
      <div className='userlist_main'>
         <Heading text="BlockList"/>
         <div className='item_main'>
          {blocklist.length > 0 
          ?
          blocklist.map((item , index)=>(
            <div key={index} className='useritem'>
                <div className="userimg">
                  
                </div>
                <div className="userinfo">
                    <div>
                      <h4>{item.blockkhaicename}</h4>
                      <p>Mern 2306</p>
                    </div>
                    <div style={{display: "flex" , alignItems: "center" , gap: "10px"}}>
                        <button onClick={()=>handleunblock(item)} className='addbtn'>Unblock</button>
                    </div>
                </div>
            </div>
          ))

          :     

           <Alert severity="info">No Block List Found</Alert>
          }
         </div>
      </div>
    </>
  )
}

export default Blocklist
