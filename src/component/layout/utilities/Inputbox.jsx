import { TextField } from '@mui/material'
import React from 'react'

const Inputbox = ({variant , placeholder}) => {
  return (
    <>
         <TextField fullWidth id="standard-basic" label={placeholder} variant={variant} />
    </>
  )
}

export default Inputbox
