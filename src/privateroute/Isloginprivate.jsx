import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Login from '../pages/auth/Login'
import { Outlet } from 'react-router-dom'

const Isloginprivate = () => {
    
    const data = useSelector((state) => state?.logedindatauser?.value)

    return data ? <Outlet/> : <Login/>
}

export default Isloginprivate
