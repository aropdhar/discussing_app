import React from 'react'
import { toast } from 'react-toastify';

const Toastify = ({toastifytext}) => {

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
     toast(toastifytext={toastifytext}); 
    </>
  )
}

export default Toastify
