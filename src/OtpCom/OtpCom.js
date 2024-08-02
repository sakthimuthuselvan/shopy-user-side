import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import "./otpstyle.css";
import { useDispatch } from 'react-redux';
import HttpRequest from '../Utilities/ApiCall/HttpRequest';
import Loader from '../Utilities/Loader/Loader';
import MySnackbar from '../AlertShow/Alert';
import { encrypt } from '../Utilities/Util';

const OtpCom = ({ resetPasswordClick }) => {
    const [state, setState] = useState({
        value: '', otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: "", disable: true,
        email: "", emailErr: false,
        otpShow: false,
        otpErr: false,
        showLoader: false,
        openSnackbar: false,
        snackType: "success",
        snackMessage: "",

    })

    const { email, emailErr, otpShow, otp1, otp2, otp3, otp4, otp5, otp6, otpErr, snackType, snackMessage, showLoader, openSnackbar } = state;
    const dispatch = useDispatch()

    const handleChange = (value1, event) => {
        let value = event.target.value.replace(/\D/, "")
        setState((pre) => ({
            ...pre,
            [value1]: value,
            otpErr: false
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const inputfocus = (elmnt) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {

                elmnt.target.form.elements[next].focus()
            }
        }
        else if (elmnt.target.value !== "") {
            const next = elmnt.target.tabIndex;
            if (next < 6) {
                elmnt.target.form.elements[next].focus()
            }
        }
    }



    const emailOnchange = (e) => {
        setState((pre) => {
            return {
                ...pre,
                email: e.target.value,
                emailErr: false
            }
        })
    }

    const emailSubmitFun = (e) => {
        e.preventDefault()
        let regex = /\S+@\S+\.\S+/
        if (!email) {
            setState((pre) => ({
                ...pre,
                emailErr: true
            }))
            document.getElementById("email").focus()
        } else if (!regex.test(email)) {
            setState((pre) => ({
                ...pre,
                emailErr: true
            }))
            document.getElementById("email").focus()

        } else {
            setState((pre) => ({
                ...pre,
                otpShow: true
            }))
            dispatch({ type: "dont_close", payload: true })

            otpSendApiCall()
        }
    }

    const otpSendApiCall = () => {
        setState((pre) => ({ ...pre, showLoader: true }))
        const method = "Post";
        const url = "shopy/forgot/opt-send";
        const data = {
            "email": email
        }
        const encrypted = {
            data: encrypt(JSON.stringify(data))
        }
        const response = HttpRequest({ method, url, encrypted });
        response
            .then((res) => {
                const message = res.response_message
                setState((pre) => ({
                    ...pre,
                    showLoader: false,
                    openSnackbar: true,
                    snackType: "success",
                    snackMessage: message
                }))
                dispatch({ type: "dont_close", payload: true })
            }).catch((err) => {

                setState((pre) => ({
                    ...pre,
                    showLoader: false,
                    openSnackbar: true,
                    snackType: "error",
                    snackMessage: err.message
                }))
            })
    }

    const verifyOTPFun = () => {
        if (!otp1 || !otp2 || !otp3 || !otp4 || !otp5 || !otp6) {
            setState((pre) => ({
                ...pre,
                otpErr: true
            }))
        } else {
            const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
            otpSubmitFun(otp)
        }
    }


    const otpSubmitFun = async (otp) => {
        setState((pre) => ({ ...pre, showLoader: true }))

        const method = "POST"
        const url = "shopy/forgot/opt-submit";
        const data = {
            "email": email,
            "opt": otp
        }
        const encrypted = {
            data: encrypt(JSON.stringify(data))
        }
        try {
            const response = await HttpRequest({ method, url, encrypted });
            setState((pre) => ({
                ...pre,
                showLoader: false,
                openSnackbar: true,
                snackType: "success",
                snackMessage: response.response_message
            }))
            dispatch({ type: "email", payload: email })
            resetPasswordClick()

        } catch (error) {
            setState((pre) => ({
                ...pre,
                showLoader: false,
                openSnackbar: true,
                snackType: "error",
                snackMessage: error.message
            }))
        }
    };

    return (
        <div>
            <Loader open={showLoader} />
            <MySnackbar open={openSnackbar} type={snackType} variant={"filled"} message={snackMessage} duration={1000} onClose={() => setState((pre) => ({ ...pre, openSnackbar: false }))} />
            <div>
                <div className='w-100 d-flex justify-content-center'>
                    <div className={"pb-3"}>
                        <div>
                            {!otpShow ?
                                <div className={"w-100"}>
                                    {/* <div className='d-flex justify-content-center mx-3 ml-4'> */}
                                    <div className='text-center mt-4 mx-3'>
                                        <h2 className='pt-3'>Email </h2>
                                        <p className='pt-3'>Enter your Email Address</p>
                                        <div>
                                            <form onSubmit={(e) => emailSubmitFun(e)}>
                                                <div>
                                                    <TextField
                                                        id='email'
                                                        name='email'
                                                        value={email}
                                                        label="Email"
                                                        variant="outlined"
                                                        className='my-2 w-100'
                                                        onChange={(e) => emailOnchange(e)}
                                                        error={emailErr}
                                                        helperText={emailErr ? "Please enter valid email address" : null}
                                                        fullWidth
                                                    />
                                                </div>

                                                <div className='submit-btn'>
                                                    <Button variant="contained"
                                                        className='w-100 bg-primary mt-3 py-2'
                                                        type='submit'
                                                    >Next</Button>
                                                </div>
                                            </form>
                                        </div>
                                        {/* </div> */}
                                    </div>
                                </div>
                                :
                                <div className='text-center mt-4 mx-3'>
                                    <h2 className='pt-3'>Verify OTP </h2>
                                    <p className='pt-3'>An OTP has been sent to your email. Enter the OTP to reset your password.</p>
                                    <div className=''>
                                        <form onSubmit={handleSubmit}>
                                            <div className="otpContainer">

                                                <input
                                                    name="otp1"
                                                    type="text"
                                                    autoComplete="off"
                                                    className="otpInput"
                                                    value={state.otp1}
                                                    inputmode="numeric"
                                                    // onKeyPress={this.keyPressed}
                                                    onChange={e => handleChange("otp1", e)}
                                                    tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}

                                                />
                                                <input
                                                    name="otp2"
                                                    type="text"
                                                    autoComplete="off"
                                                    className="otpInput"
                                                    inputmode="numeric"
                                                    value={state.otp2}
                                                    onChange={e => handleChange("otp2", e)}
                                                    tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}

                                                />
                                                <input
                                                    name="otp3"
                                                    type="text"
                                                    autoComplete="off"
                                                    className="otpInput"
                                                    inputmode="numeric"
                                                    value={state.otp3}
                                                    onChange={e => handleChange("otp3", e)}
                                                    tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}

                                                />
                                                <input
                                                    name="otp4"
                                                    type="text"
                                                    autoComplete="off"
                                                    className="otpInput"
                                                    inputmode="numeric"
                                                    value={state.otp4}
                                                    onChange={e => handleChange("otp4", e)}
                                                    tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}
                                                />

                                                <input
                                                    name="otp5"
                                                    type="text"
                                                    autoComplete="off"
                                                    className="otpInput"
                                                    inputmode="numeric"
                                                    value={state.otp5}
                                                    onChange={e => handleChange("otp5", e)}
                                                    tabIndex="5" maxLength="1" onKeyUp={e => inputfocus(e)}
                                                />
                                                <input
                                                    name="otp6"
                                                    type="text"
                                                    autoComplete="off"
                                                    className="otpInput"
                                                    inputmode="numeric"
                                                    value={state.otp6}
                                                    onChange={e => handleChange("otp6", e)}
                                                    tabIndex="6" maxLength="1" onKeyUp={e => inputfocus(e)}
                                                />
                                            </div>
                                            <small className='text-danger mt-2'>{otpErr ? "These fiels are required" : null}</small>
                                            <div className='submit-btn'>
                                                <Button variant="contained"
                                                    className='w-100 bg-primary mt-3 py-2'
                                                    onClick={() => verifyOTPFun()}
                                                >Verify OTP</Button>
                                            </div>
                                            <div className='pb-2 pt-2 mt-1'><span className='text-info pointer' onClick={() => otpSendApiCall()}>Resend OTP</span></div>

                                        </form>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpCom



