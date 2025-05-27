import React, { useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputLabel } from '@mui/material';
import HttpRequest from '../Utilities/ApiCall/HttpRequest';
import MySnackbar from '../AlertShow/Alert';
import { useSelector } from 'react-redux';

const ResetPassword = ({ goLogInFun }) => {
    const [state, setState] = useState({
        email: "",
        showPassword1: false,
        showPassword2: false,
        password: "",
        passwordErr: false,
        confirmPassword: "",
        confirmPasswordErr: false,
        errMsg: "",
        alertType: "",
        alertMessage: ""
    })

    const globalState = useSelector((state) => state)
    const { showPassword1, showPassword2, password, passwordErr, confirmPassword, confirmPasswordErr, errMsg } = state;

    useEffect(() => {
        setState((pre) => ({
            ...pre,
            email: globalState.email
        }))
    }, [globalState.email])

    const handleClickShowPassword1 = () => {
        setState((pre) => {
            return {
                ...pre,
                showPassword1: !showPassword1
            }
        })
    }

    const handleClickShowPassword2 = () => {
        setState((pre) => {
            return {
                ...pre,
                showPassword2: !showPassword2
            }
        })
    }

    const handleInputChange = (e, name, err) => {
        setState({
            ...state,
            [name]: e.target.value,
            [err]: false
        })
    }

    const resetSubmitFun = () => {
        if (!password) {
            setState((pre) => ({
                ...pre,
                passwordErr: true,
                errMsg: "This field is required"
            }))
            document.getElementById("password").focus()
        } else if (!confirmPassword) {
            setState((pre) => ({
                ...pre,
                confirmPasswordErr: true,
                errMsg: "This field is required"
            }))
            document.getElementById("confirmPassword").focus()
        } else if (password !== confirmPassword) {
            setState((pre) => ({
                ...pre,
                confirmPasswordErr: true,
                errMsg: "Confirm password is not match to password"
            }))
            document.getElementById("confirmPassword").focus()
        } else {
            resetApiCallFun()
        }
    }

    const resetApiCallFun = async () => {

        const method = "POST";
        const url = "shopy/reset/password";
        const data = {
            email: globalState.email,
            password: confirmPassword, // Provide a valid password here
        };
        try {
            const response = await HttpRequest({ method, url, data });
            setState((pre) => ({
                ...pre,
                confirmPasswordErr: false,
                passwordErr: false,
                showLoader: false,
                openSnackbar: true,
                snackType: "success",
                snackMessage: response.message
            }))
            goLogInFun()
        } catch (error) {
            setState((pre) => ({
                ...pre,
                confirmPasswordErr: false,
                passwordErr: false,
                showLoader: false,
                openSnackbar: true,
                snackType: "error",
                snackMessage: error.message
            }))
        }
    };


    return (
        <div>
            <MySnackbar open={false} type={"success"} variant={"filled"} message={"OTP sent successfully"} duration={3000} />

            <div>

                <div className={`p-0 w-100 d-flex`}>


                    <div className={"w-100"}>
                        <div className='d-flex justify-content-center mx-3 ml-4'>
                            <div className='text-center mt-4 mx-3'>
                                <h2 className='pt-3'>Reset Password </h2>
                                <p className='pt-3'>Enter new password for shopy account</p>


                                <div className=''>

                                    <FormControl className='my-2 w-100' variant="outlined" error={passwordErr}>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            type={showPassword1 ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword1}
                                                        edge="end"
                                                    >
                                                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                            onChange={(e) => handleInputChange(e, "password", "passwordErr")}
                                            error={passwordErr}
                                            helperText={passwordErr ? errMsg : null}
                                        />
                                    </FormControl>

                                    <FormControl className='my-3 w-100' variant="outlined" error={confirmPasswordErr}>
                                        <InputLabel htmlFor="">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="confirmPassword"
                                            type={showPassword2 ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => handleClickShowPassword2()}
                                                        edge="end"
                                                    >
                                                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirm Password"
                                            onChange={(e) => handleInputChange(e, "confirmPassword", "confirmPasswordErr")}
                                            error={confirmPasswordErr}
                                            helperText={confirmPasswordErr ? errMsg : null}
                                        />
                                    </FormControl>
                                </div>

                                <div className='pt-5'>
                                    <Button variant="contained"
                                        className='w-100 bg-primary mt-3 py-2'
                                        onClick={() => resetSubmitFun()}
                                    >Reset Password</Button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
