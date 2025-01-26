import { Button, IconButton, InputLabel, TextField, Typography, useTheme, } from '@mui/material';
import React, { useEffect, useState } from 'react'
import HttpRequest from '../Utilities/ApiCall/HttpRequest';
import "./signin.css"
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Loader from '../Utilities/Loader/Loader';
import { useDispatch } from 'react-redux';
import MySnackbar from '../AlertShow/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import SignUp from '../SignUp/SignUp';
import OtpCom from '../OtpCom/OtpCom';
import ResetPassword from "../ResetPssword/ResetPassword"
import { useSelector } from 'react-redux'
import { encrypt } from '../Utilities/Util';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function SignIn(props) {
    const theme = useTheme();  // Access the current theme
    const primaryColor = theme.palette.primary.main;  // Get the primary color
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
    const globalState = useSelector((state) => state)
    const { email, password, emailErr, signUpCheck, dontClose, openDialog, passwordErr, errMsg, showPassword, showLoader, openSnackbar, snackType, snackMessage } = state;

    useEffect(() => {
        setState((pre) => {
            return {
                ...pre,
                openDialog: true,
                signUpCheck: 1,
                email: "",
                password: "",
            }
        })
    }, [])


    const handleClose = () => {
        setState((pre) => {
            return {
                ...pre,
                openDialog: false
            }
        })
        dispatch({ type: "open_dialog", payload: false })
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
        setState((pre) => ({ ...pre, showLoader: true }))
        const method = "Post";
        const url = "shopy/user/login";
        const data = {
            "email": email,
            "password": password
        }
        const encrypted = {
            data: encrypt(JSON.stringify(data))
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
                    openDialog: false,
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

    const resetPasswordClick = (type) => {
        if(type === "back"){
            setState((pre) => {
                return {
                    ...pre,
                    signUpCheck: 1
                }
            })
        }else{
            setState((pre) => {
                return {
                    ...pre,
                    signUpCheck: 4
                }
            })
        }

    }

    const logInHtmlBuild = () => {
        return (
            <div className='d-flex justify-content-center mx-3 ml-4'>
                <div className='text-center mt-4 mx-3'>
                    <Typography className='fw-bold' variant='h5'>LogIn</Typography>
                    <Typography>LogIn into the account</Typography>
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
                        <p className='text-start pt-4'><span className='pointer' style={{ color: primaryColor }} onClick={() => forgotPassFun()}>Forgot Password</span></p>
                    </div>
                    <div className='mt-4 py-3 mt-4'>
                        <Button variant="contained"
                            sx={{ backgroundColor: primaryColor }}
                            className='w-100 mt-3 py-2'
                            onClick={() => submitFun()}
                        >Submit</Button>
                    </div>
                    <div className='pb-2 pt-1'>Don't have an account <span style={{ color: primaryColor }} className='pointer' onClick={() => goSignUp()}>SignUp</span></div>
                </div>
            </div>
        )
    }

    const dialogCloseFun=()=>{
        setState((pre)=>({
            ...pre,
            openDialog: false
        }))
        props.loginPageCallBack(false)
    }
    console.log("openDialog ", openDialog)
    return (
        <div>
            <Loader open={showLoader} />
            <MySnackbar open={openSnackbar} type={snackType} variant={"filled"} message={snackMessage} duration={3000} onClose={() => setState((pre) => ({ ...pre, openSnackbar: false }))} />
            <Dialog
                        open={openDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        maxWidth={'xs'}
                        fullWidth
                        onClose={dialogCloseFun}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent className='p-1'>
                            <div>
                                {signUpCheck === 1 ?
                                    logInHtmlBuild()
                                    :
                                    signUpCheck === 2 ?
                                        <SignUp goLogInFun={goLogInFun} />
                                        :
                                        signUpCheck === 3 ?
                                            <OtpCom resetPasswordClick={resetPasswordClick} />
                                            :
                                            <ResetPassword goLogInFun={goLogInFun} />
                                }
                            </div>
                        </DialogContent>
                        <DialogActions>
                        </DialogActions>
                    </Dialog>
        </div>
    )
}

export default SignIn