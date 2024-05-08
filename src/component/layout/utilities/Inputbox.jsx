import { TextField } from '@mui/material'
import React from 'react'

const Inputbox = ({variant , placeholder , id , name , onChange ,value , type}) => {
  return (
    <>
         <TextField fullWidth id={id} type={type} name={name} onChange={onChange} label={placeholder} variant={variant} value={value} />
    </>
  )
}

export default Inputbox
