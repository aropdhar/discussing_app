import React, { useEffect, useState } from 'react'
import './userlist.css'
import Heading from '../heading/Heading'
import { getDatabase, ref, onValue , push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const Userlist = () => {
  
  const data = useSelector((state) => state.logedindatauser.value)
  const db = getDatabase();
  let [userarr , setUserarr] = useState([]);

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

  return (
    <>
       <div className='userlist_main'>
         <Heading text="User List"/>
         <div className='item_main'>
          {userarr.map((item , index)=>(
            <div key={index} className='useritem'>
                <div className="userimg">
                  
                </div>
                <div className="userinfo">
                    <div>
                      <h4>{item.DisplayName}</h4>
                      <p>Mern 2306</p>
                    </div>
                    <button className='addbtn'>Add Friend</button>
                </div>
            </div>
          ))

          }
         </div>
      </div>

    </>
  )
}

export default Userlist
