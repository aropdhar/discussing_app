import React from 'react'
import Userlist from '../../component/userlist/Userlist'
import FriendRequest from './FriendRequest'
import Friends from '../../component/userlist/Friends'

const Home = () => {
  return (
    <>
    <div style={{marginTop: '8px', display: "flex" , alignItems: "center" , gap: "20px" , flexWrap: "wrap"}}>
      <div>
        <Userlist/>
      </div>
      <div>
        <FriendRequest/>
      </div>
      <div>
        <Friends/>
      </div>
    </div>
    </>
  )
}

export default Home
