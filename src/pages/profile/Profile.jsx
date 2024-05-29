import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './profile.css'
import { getDatabase, ref, onValue , push, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {

    let { id } = useParams();
    const data = useSelector((state) => state.logedindatauser.value)
    const db = getDatabase();
    const [profilenam , setProfileName] = useState([])

    useEffect(()=>{
        const addreqRef = ref(db, 'users');
        onValue(addreqRef, (snapshot) => {
          
          let arr = [];
    
          snapshot.forEach((item)=>{
            if(item.key == id){   
              arr.push({...item.val() , id: item.key});
            }
          });
          
          setProfileName(arr);
        });
      },[])
 
      

  return (
    <>
       <div>
          <div className='coverphoto'></div>
          <div className='profile_main'>
            <div className='profile_photo'></div>
            <div className='profile_name'>
               <h1>{profilenam[0]?.DisplayName}</h1>
               <p>Mern Developer</p>
            </div>
          </div>
       </div>
    </>
  )
}

export default Profile
