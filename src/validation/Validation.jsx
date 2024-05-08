import React from 'react'
import * as Yup from 'yup';

let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Validation = Yup.object({
    password: Yup.string()
            .max(10, 'Must be 10 characters or less')
            .min(5 , 'must be 5 characters')
            .required('Please Enter Your Password'),
    email: Yup.string()
          .email('Invalid Email Address')
          .matches(emailregex , "Please Matches in regex")
          .required('Please Enter Your Email'),
  })

export default Validation
