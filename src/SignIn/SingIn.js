import { Button, IconButton, InputLabel, TextField, } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HttpRequest from '../Utilities/ApiCall/HttpRequest';
import "./signin.css"
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import WindowWidth from "../Utilities/index"
import Loader from '../Utilities/Loader/Loader';
import { useDispatch } from 'react-redux';
import MySnackbar from '../AlertShow/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SignUp from '../SignUp/SignUp';
import OtpCom from '../OtpCom/OtpCom';
import ResetPassword from "../ResetPssword/ResetPassword"
import {useSelector} from 'react-redux'
import { encrypt } from '../Utilities/Util';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function SignIn() {
    const [state, setState] = useState({
        email: "",
        password: "",
        emailErr: false,
        passwordErr: false,
        errMsg: "",
        showLoader: false,
        showPassword: false,
        openSnackbar: false,
        snackType: "success",
        snackMessage: "",
        signUpCheck: 1,
        openDialog: false,
        dontClose: false

    })
    const dispatch = useDispatch();
    const globalState = useSelector((state)=> state)
    const { email, password, emailErr, signUpCheck, dontClose, openDialog, passwordErr, errMsg, showPassword, showLoader, openSnackbar, snackType, snackMessage } = state;

useEffect(()=>{
    setState((pre) => {
        return {
            ...pre,
            openDialog: globalState.openPopup,
            signUpCheck: 1,
            email: "",
            password: "",
        }
    })
},[globalState.openPopup])


useEffect(()=>{
        setState((pre) => {
            return {
                ...pre,
                dontClose: globalState.dontClose
            }
        })
      
},[globalState.dontClose])

    useEffect(() => {
        setState((pre) => {
            return {
                ...pre,
                openDialog: globalState.openPopup
            }
        })
    }, [])
 

    const handleClose = () => {
        setState((pre)=>{
            return{
                ...pre,
                openDialog: false
            }
        })
        dispatch({type:"open_dialog",payload:false})
    };


    const handleInputChange = (e, name, err) => {
        setState({
            ...state,
            [name]: e.target.value,
            [err]: false
        })
    }

    const submitFun = () => {
        let regex = /\S+@\S+\.\S+/
        if (!email) {
            setState((prev) => ({
                ...prev,
                emailErr: true
            }));
            document.getElementById("email").focus()
        } else if (!regex.test(email)) {
            setState((prev) => ({
                ...prev,
                emailErr: true
            }));
            document.getElementById("email").focus()
        } else if (!password) {
            setState((prev) => ({
                ...prev,
                passwordErr: true
            }));
            document.getElementById("password").focus()
        } else {
                logInApiCall()
        }
    }



    const logInApiCall = () => {
        setState((pre)=>({...pre,showLoader: true}))
        const method = "Post";
        const url = "shopy/user/login";
        const data = {
            "email": email,
            "password": password
        }
        const encrypted ={
            data : encrypt(JSON.stringify(data))
        } 
console.log(encrypted);
        const response = HttpRequest({ method, url, encrypted });
        response
            .then((res) => {
                const message = res.response_message ? res.response_message : ""
                const isToken = res.data && res.data.token ? res.data.token : ""
                localStorage.setItem("_Auth", isToken)
                setState({
                    ...state,
                    showLoader: false,
                    openDialog:false,
                    openSnackbar: true,
                    snackType: "success",
                    snackMessage: message
                })
                const token = !!localStorage.getItem("_Auth")
                if (token) {
                    dispatch({ type: "Auth" })
                }
            }).catch((err) => {

                setState({
                    ...state,
                    showLoader: false,
                    openSnackbar: true,
                    snackType: "error",
                    snackMessage: err.message
                })
            })
    }

    const goSignUp = () => {
        setState((prev) => ({
            ...prev,
            signUpCheck: 2
        }))
    }

    const goLogInFun = () => {
        setState((prev) => ({
            ...prev,
            signUpCheck: 1
        }))
    }

    const handleClickShowPassword = () => {
        setState((pre) => {
            return {
                ...pre,
                showPassword: !showPassword
            }
        })
    }

    const forgotPassFun = () => {
        setState((pre) => {
            return {
                ...pre,
                signUpCheck: 3
            }
        })
    }

    const resetPasswordClick = () => {
        setState((pre) => {
            return {
                ...pre,
                signUpCheck: 4
            }
        })
    }

 
    const size = WindowWidth()
    return (
        <div>
            <Loader open={showLoader} />
            <MySnackbar open={openSnackbar} type={snackType} variant={"filled"} message={snackMessage} duration={3000} onClose={()=>setState((pre)=>({...pre,openSnackbar:false}))}/>
            <div className={size === "lg" ? 'overall-signin rounded' : "overall-small"}>
                <div className={`p-0 w-100 d-flex ${size === "lg" ? "jr-card jr-card-style" : ""}`}>
                    <Dialog
                        open={openDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={dontClose ? null : handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent className='p-1'>
                            <div>
                                {signUpCheck === 1 ?
                                    <div className='d-flex justify-content-center mx-3 ml-4'>
                                        <div className='text-center mt-4 mx-3'>
                                            <h2>LogIn</h2>
                                            <p>LogIn into the account</p>
                                            <div className='pt-4'>
                                                <TextField
                                                    id='email'
                                                    name="email"
                                                    value={email}
                                                    label="Email"
                                                    type='email'
                                                    variant="outlined"
                                                    className='my-2 w-100'
                                                    onChange={(e) => handleInputChange(e, "email", "emailErr")}
                                                    error={emailErr}
                                                    helperText={emailErr ? errMsg : null}
                                                />
                                                <FormControl className='my-2 w-100' variant="outlined" error={passwordErr}>
                                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                    <OutlinedInput
                                                        id="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label="Password"
                                                        onChange={(e) => handleInputChange(e, "password", "passwordErr")}
                                                        error={passwordErr}
                                                        helperText={passwordErr ? errMsg : null}
                                                    />
                                                </FormControl>
                                            </div>
                                            <div>
                                                <p className='text-start pt-4 text-info '><span className='pointer' onClick={() => forgotPassFun()}>Forgot Password</span></p>
                                            </div>
                                            <div className='mt-4 py-3 mt-4'>
                                                <Button variant="contained"
                                                    className='w-100 bg-primary mt-3 py-2'
                                                    onClick={() => submitFun()}
                                                >Submit</Button>
                                            </div>
                                            <div className='pb-2 pt-1'>Don't have an account <span className='text-info pointer' onClick={() => goSignUp()}>SignUp</span></div>
                                        </div>
                                    </div> :
                                    signUpCheck === 2 ?
                                        <SignUp goLogInFun={goLogInFun} />
                                        :
                                        signUpCheck === 3 ?
                                            <OtpCom resetPasswordClick={resetPasswordClick} />
                                            :
                                            <ResetPassword goLogInFun={goLogInFun}/>
                                }
                            </div>
                        </DialogContent>
                        <DialogActions>
                        </DialogActions>
                    </Dialog>



                </div>
            </div>
        </div>
    )
}

export default SignIn