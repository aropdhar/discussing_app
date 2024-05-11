import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import registrationbg from '../../assets/registration_bg.png'
import Image from '../../component/layout/utilities/Image';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Inputbox from '../../component/layout/utilities/Inputbox';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import registervalidate from '../../registervalidation/Regvalidation';
import { getAuth, createUserWithEmailAndPassword , sendEmailVerification } from "firebase/auth";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Registrationhead = styled(Typography)({
    
  width: "497px",
  fontSize: "34.4px",
  lineHeight: "46.92px",
  fontFamily: "bold"
  
});

const Registrationsubhead = styled(Typography)({
    
  width: "319px",
  fontSize: "20.64px",
  lineHeight: "28.15px",
  fontFamily: "normal",
  color: "#11175D",
  opacity: "0.5",
  margin: '30px 0 30px 0'
});

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '20.64px',
  padding: '19px 158px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#5F35F5',
  borderColor: '#0063cc',
  borderRadius: '86px',
  marginBottom: '30px'
});


const Register = () => {
  
  const auth = getAuth();

  const initialValues = {

    signemail: '',
    signfullname: '',
    signpassword: '',
    
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registervalidate,
    
    onSubmit: (values , actions) => {

      actions.resetForm();

      createUserWithEmailAndPassword(auth, values.signemail, values.signpassword)
      .then((userCredential) => {
        
        sendEmailVerification(auth.currentUser)
        .then(() => {
           console.log(userCredential);
           console.log("verfied hoice");
        });

        
      })
      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        
      });

    },
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={6} style={{display: 'flex' , alignItems:'center' , justifyContent: 'center'}}>
            <div>
                <Registrationhead variant="h1">
                    Get started with easily register 
                </Registrationhead>
                <Registrationsubhead variant="h4">
                    Free register and you can enjoy it
                </Registrationsubhead>
              <form onSubmit={formik.handleSubmit}>
                <div className='register_main'>
                  <div>
                    <Inputbox 
                    id="signemail"
                    name="signemail"
                    type="email" 
                    variant="outlined" 
                    placeholder="Email Address"
                    onChange={formik.handleChange}
                    value={formik.values.signemail}
                    />
                     {formik.touched.signemail && formik.errors.signemail ? (
                        <div className='signuperror'>{formik.errors.signemail}</div>
                      ) : null}
                  </div>
                  
                  <div>
                    <Inputbox 
                      type="text" 
                      id="signfullname"
                      name="signfullname"
                      variant="outlined" 
                      placeholder="Full Name"
                      onChange={formik.handleChange}
                      value={formik.values.signfullname}
                    />
                     {formik.touched.signfullname && formik.errors.signfullname ? (
                        <div className='signuperror'>{formik.errors.signfullname}</div>
                      ) : null}
                  </div>
                  <div>
                    <Inputbox 
                    id="signpassword"
                    name="signpassword"
                    type="password" 
                    variant="outlined" 
                    placeholder="Enter Your Password"
                    onChange={formik.handleChange}
                    value={formik.values.signpassword}
                    />
                       {formik.touched.signpassword && formik.errors.signpassword ? (
                        <div className='signuperror'>{formik.errors.signpassword}</div>
                      ) : null}
                  </div>

                    {/* radio section start here */}
                    {/* <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        
                       </FormControl> */}
                    {/* radio section End here */}

                    <BootstrapButton type='submit' variant="contained" disableRipple>
                      Sign up
                    </BootstrapButton>
                </div>
              </form>

                <span className='registerin'>Already  have an account ? <NavLink to='/' className='registersignin'>Sign In</NavLink></span>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{width: "100%" , height: "100vh"}}>
               <Image source={registrationbg} alt="Not Found" styledimg="registarimg"/>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Register
