import React, { useEffect, useState } from 'react'
import './userlist.css'
import Heading from '../heading/Heading'
import { getDatabase, ref, onValue , push, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const Userlist = () => {
  
  const data = useSelector((state) => state.logedindatauser.value)
  const db = getDatabase();
  const [userarr , setUserarr] = useState([]);
  const [freqlist , setFreqlist] = useState([])

  
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
            {userarr.map((item , index)=>(
              <div key={index} className='useritem'>
                  <div className="userimg">
                    
                  </div>
                  <div className="userinfo">
                      <div>
                        <h4>{item.DisplayName}</h4>
                        <p>Mern 2306</p>
                      </div>
                      {freqlist.includes(data.uid + item.id) || freqlist.includes(item.id + data.uid)

                      ?
                        <button className='addbtn'>cancel</button>
                      
                      :
                      
                        <button onClick={()=>handlefreq(item)} className='addbtn'>Add Friend</button>

                      }
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
