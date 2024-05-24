import React from 'react'
import Userlist from '../../component/userlist/Userlist'
import FriendRequest from './FriendRequest'

const Home = () => {
  return (
    <>
    <div style={{marginTop: '30px', display: "flex" , alignItems: "center" , gap: "20px" , flexWrap: "wrap"}}>
      <div>
        <Userlist/>
      </div>
      <div>
        <FriendRequest/>
      </div>
    </div>
    </>
  )
}

export default Home
