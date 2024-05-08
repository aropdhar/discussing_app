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
import Validation from '../../validation/Validation';
import Heading from '../../component/heading/Heading';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";


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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  let initialValues = {
    email: '',
    password: ''
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Validation,
    onSubmit: (values , actions) => {
       console.log(values);
       actions.resetForm();
    },
  });

  let handlecross = () =>{

  }

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
                    <div>
                      <Inputbox 
                       type="email" 
                       id="email"
                       name="email"
                       variant="standard" 
                       placeholder="Email Address"
                       onChange={formik.handleChange}
                       value={formik.values.email}
                       />
                          {formik.touched.email && formik.errors.email ? (
                            <div className='fromikerror'>{formik.errors.email}</div>
                          ) : null}
                    </div>
                    <div>

                      <Inputbox 
                       type='password'
                       id='password'
                       name="password"
                       variant="standard"
                       placeholder="Enter Password"
                       onChange={formik.handleChange}
                       value={formik.values.password}
                       />
                      
                      {formik.touched.password && formik.errors.password ? (
                            <div className='fromikerror'>{formik.errors.password}</div>
                      ) : null}
                    </div>


                      <BootstrapButton type='submit' variant="contained" disableRipple>
                        Login to Continue
                      </BootstrapButton>
                      
                    <a className='modal' onClick={handleOpen}>Forgot Password??</a>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
           <h1 style={{textAlign: 'center' , marginBottom: '20px'}}>Forgot Your Password</h1>

          <Inputbox 
          type="password" 
          id="forgotpassword"
          name="forgotpassword"
          variant="outlined" 
          placeholder="Enter Your New Password" 
          className='forgotinput'/>
          <div style={{marginTop: '30px' , textAlign: 'center'}}>
            <BootstrapButton type='submit' variant="contained" disableRipple>
              Reset Password
            </BootstrapButton>
          </div>
          <IoMdClose onClick={()=>setOpen(false)} className='close'/>
        </Box>
      </Modal>

    </>
  )
}

export default Login
