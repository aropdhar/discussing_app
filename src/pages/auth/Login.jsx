import React from 'react'
import './auth.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import googleimg from '../../assets/google.webp'
import Image from '../../component/layout/utilities/Image';
import Inputbox from '../../component/layout/utilities/Inputbox';
import { NavLink } from 'react-router-dom';
import loginbg from '../../assets/Rectangle 69.webp'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Loginhead = styled(Typography)({
  width: '371.79px',
  lineHeight: '45.41px',
  color: "#03014C",
  fontSize: '33.34px',
  marginBottom: '30px'
})

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 20,
  padding: '26px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#5F34F5',
  borderColor: '#0063cc',
  width: '424.9px',
  marginBottom: '30px'
});


const Login = () => {
   
  let initialValues = {
    email: '',
    password: ''
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      password: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .min(5 , 'must be 5 characters')
        .required('Please Enter Your Password'),
      email: Yup.string()
      .email('Invalid email address')
      .required('Please Enter Your Email'),
    }),
    onSubmit: values => {
       console.log(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>

          <Grid container spacing={0}>
            <Grid item xs={6} style={{display: "flex" , alignItems: "center" , justifyContent: "center"}}>
              <div>
                  <Loginhead variant="h4">
                      Login to your account!
                  </Loginhead>
                  <Image source={googleimg} alt="Not Found" styledimg="googleimg"/>
                <form onSubmit={formik.handleSubmit}>
                  <div className='login_main'>
                      <Inputbox 
                       type="email" 
                       id="email"
                       variant="standard" 
                       placeholder="Email Address"
                       onChange={formik.handleChange}
                       value={formik.values.email}
                       />
                          {formik.touched.email && formik.errors.email ? (
                            <div className='fromikerror'>{formik.errors.email}</div>
                          ) : null}
                      <Inputbox 
                       type='password'
                       id='password'
                       variant="standard"
                       placeholder="Enter Password"
                       onChange={formik.handleChange}
                       value={formik.values.password}
                       />
                      
                      {formik.touched.password && formik.errors.password ? (
                            <div className='fromikerror'>{formik.errors.password}</div>
                      ) : null}


                      <BootstrapButton type='submit' variant="contained" disableRipple>
                        Login to Continue
                      </BootstrapButton>
                      
                  </div>
                </form>

                   
                  <span style={{fontSize: "13.34px" , color: '#03014C' , fontweight:"700",lineHeight: "18.16px" }}>Don’t have an account ? <NavLink to='/registration' style={{fontSize: "13.34px" , color: 'red' , fontweight:"700", lineHeight: "18.16px" }}>Sign up</NavLink></span>
              </div>
            </Grid>


            <Grid item xs={6}>
              <div style={{width: "100%" , height: "100vh" }}>
                <Image source={loginbg} alt="Not Found" styledimg="loginimg"/>
              </div>
            </Grid>
          </Grid>
      </Box>      
      
    </>
  )
}

export default Login
