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
  width: '424.9px'
});


const Login = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>

          <Grid container spacing={0}>
            <Grid item xs={6} style={{display: "flex" , alignItems: "center" , justifyContent: "center"}}>
              <div className='login_main'>
                  <Loginhead variant="h4">
                      Login to your account!
                  </Loginhead>
                  <Image source={googleimg} alt="Not Found" styledimg="googleimg"/>
                  
                  <Inputbox variant="standard" placeholder="Email Address"/>

                  <Inputbox variant="standard" placeholder="Enter Password"/>

                  <BootstrapButton variant="contained" disableRipple>
                    Login to Continue
                  </BootstrapButton>
                  <span style={{fontSize: "13.34px" , color: '#03014C' , fontweight:"700", lineHeight: "18.16px" }}>Don’t have an account ? <NavLink to='/registration' style={{fontSize: "13.34px" , color: 'red' , fontweight:"700", lineHeight: "18.16px" }}>Sign up</NavLink></span>
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
