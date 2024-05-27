import React from 'react'
import error from '../../assets/error.webp'
import Image from '../../component/layout/utilities/Image'
import { useNavigate } from 'react-router-dom';


const Error = () => {
  const navigate = useNavigate();

  let handlebtn = () =>{
    navigate('/')
  }
  return (
    <>
      <div style={{display: "flex" , alignItems: "center" , justifyContent: "center"}}>
        <Image source={error} alt="Not Found"/>
      </div>
      <div style={{display: "flex" , alignItems: "center" , justifyContent: "center"}}> 
        <button onClick={handlebtn} style={{background: "blue" , padding: "10px 20px" , fontSize: "18px" , border: "none" , borderRadius: "8px" , color: "#fff" , cursor: "pointer"}}>Back To Home</button>
      </div>
    </>
  )
}

export default Error
