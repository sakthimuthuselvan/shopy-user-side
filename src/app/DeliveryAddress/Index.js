import React, { useState } from 'react'
import "./style.scss"
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Radio, Select, TextField } from '@mui/material'
import stateList from "../../JsonList/StateList/Index.json";
import { useDispatch, useSelector } from 'react-redux';
import { TbTruckDelivery } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';
import { useTheme } from '@emotion/react';
import HttpRequest from '../../Utilities/ApiCall/HttpRequest';
import Loader from "../../Utilities/Loader/Loader";
import { getUserData, lightenColor } from '../../Utilities/Util';
import { removeAllProducts } from '../../Redux/Features/CartSlice';
import { useNavigate } from 'react-router-dom';
import MySnackbar from '../../AlertShow/Alert';

function Index() {
  const theme = useTheme();  // Access the current theme
  const primaryColor = theme.palette.primary.main;  // Get the primary color
  const lightPrimary = lightenColor(theme.palette.primary.main)
  const currency = localStorage.getItem("CURRENCY")
  const cartProducts = useSelector(state => state.cart.cartProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [overallList] = useState(cartProducts)

  const [formInputs, setFormInputs] = useState({
    firstName: "",
    address1: "",
    address2: "",
    landMark: "",
    phoneNumber: "",
    district: "",
    state: { code: "", name: "" },
    country: "india",
    pincode: "",
    address1Err: false,
    firstNameErr: false,
    address2Err: false,
    countryErr: false,
    stateErr: false,
    districtErr: false,
    phoneNumberErr: false,
    pincodeErr: false,
    landMarkErr: false,
  })
  const [showLoader, setShowLoader] = useState(false);
  const [alertData, setAlertData] = useState({
    openSnakbar: false,
    openSnakbarType: "error",
    openSnakbarMsg: "",
  });
  const [selectedValue, setSelectedValue] = useState(1); // Track selected radio
  const [showNext, setShowNext] = useState(false); // Track selected radio

  const { firstName, firstNameErr, address1, address1Err, address2, address2Err, district, districtErr, country, countryErr, phoneNumber, phoneNumberErr, state, stateErr, pincode, pincodeErr, landMark, landMarkErr } = formInputs;

  const handleChange = (name, err, value) => {
    if (name === "pincode") {
      setFormInputs((pre) => ({
        ...pre,
        [name]: value,
        [err]: false,
      }))
    } else {
      setFormInputs((pre) => ({
        ...pre,
        [name]: value,
        [err]: false
      }))
    }

  }

  const formSubmit = (event) => {
    event.preventDefault()
    paySubmitBtnClick()
  }

  const paySubmitBtnClick = () => {
    if (!firstName) {
      setFormInputs((pre) => ({
        ...pre,
        firstNameErr: true
      }))
      document.getElementById("firstName").focus()
    } else if (!address1) {
      setFormInputs((pre) => ({
        ...pre,
        address1Err: true
      }))
      document.getElementById("address1").focus()
    } else if (!pincode || pincode.length < 6) {
      setFormInputs((pre) => ({
        ...pre,
        pincodeErr: true
      }))
      document.getElementById("pincode").focus()

    } else if (!landMark) {
      setFormInputs((pre) => ({
        ...pre,
        landMarkErr: true
      }))
      document.getElementById("state").focus()
    } else if (!state) {
      setFormInputs((pre) => ({
        ...pre,
        stateErr: true
      }))
      document.getElementById("state").focus()
    } else if (!district) {
      setFormInputs((pre) => ({
        ...pre,
        districtErr: true
      }))
      document.getElementById("district").focus()
    } else if (!phoneNumber || phoneNumber.length < 10) {
      setFormInputs((pre) => ({
        ...pre,
        phoneNumberErr: true
      }))
      document.getElementById("district").focus()
    } else {
      setShowNext(true)
          window.scrollTo(0, 0);
    }

  }

  const submitApiCallFun = () => {
    let totalAmt = 0;
    overallList.forEach((item) => {
      totalAmt += item.price * item.quantity
    })
    const method = "POST";
    const url = "create-order";
    const data = {
      "amount": totalAmt,
      "currency": "INR",
    }
    axiosApiCallFun(method, url, data, "createOrderReq");
  }


  const axiosApiCallFun = async (method, url, data, type) => {
    setShowLoader(true)
    try {
      const response = await HttpRequest({ method, url, data });
      switch (type) {
        case "createOrderReq":
          createOrderResFun(response)
          break;
        case "verifyPaymentReq":
          verifyPaymentResFun(response)
          break;
        default:
          break;
      }
    } catch (error) {
      setShowLoader(false)
      setAlertData((prev) => ({
        ...prev,
        openSnakbar: true,
        openSnakbarType: "error",
        openSnakbarMsg: error.response_message
          ? error.response_message
          : "Something went wrong",
      }));
    }
  };
  const createOrderResFun = async (data) => {
    // ✅ Load Razorpay Key from `.env` File
    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID; // Ensure this is set in .env file

    if (!razorpayKey) {
      setShowLoader(false)
      return;
    }

    // ✅ Razorpay Payment Options
    const options = {
      key: razorpayKey, // Use the loaded key
      amount: data.amount,
      currency: data.currency,
      name: "Shopy",
      description: "",
      order_id: data.id,
      handler: function (response) {
        setShowLoader(false)
        orderVerfiyAPiCall(data, response)
      },
      prefill: {
        name: firstName,
        email: "",
        contact: phoneNumber,
      },
      method: {
        netbanking: true,
        card: true,
        wallet: true,
        upi: true, // ✅ Enable UPI (Google Pay, PhonePe, Paytm, etc.)
      },
      theme: {
        color: primaryColor,
      },
      modal: {
        ondismiss: function () {
          setShowLoader(false)
        },
      },
    };

    if (typeof window.Razorpay === "undefined") {
      setShowLoader(false)
      return;
    }

    // ✅ Open Razorpay Payment Window
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const orderVerfiyAPiCall = (dataPre, response) => {
    const method = "POST";
    const url = "verify-payment";
    const data = {
      "user_id": getUserData() && getUserData().user_id ? getUserData().user_id : "",
      "payment_type": 1,
      "razorpay_payment_id": response.razorpay_payment_id,
      "razorpay_order_id": response.razorpay_order_id,
      "razorpay_signature": response.razorpay_signature,
      "currency": dataPre.currency,
      "amount": (dataPre.amount / 100),
      "products": overallList,
      "shippingAddress": {
        "firstName": formInputs.firstName ?? "",
        "address1": formInputs.address1 ?? "",
        "address2": formInputs.address2 ?? "",
        "landMark": formInputs.landMark ?? "",
        "phoneNumber": formInputs.phoneNumber ?? "",
        "district": formInputs.district ?? "",
        "state": formInputs.state ?? "",
        "country": formInputs.country ?? "",
        "pincode": formInputs.pincode ?? ""
      }
    }
    axiosApiCallFun(method, url, data, "verifyPaymentReq");
  }

  const verifyPaymentResFun = () => {
    setShowLoader(false)
    navigate("/")
    dispatch(removeAllProducts())
  }

  const billDetailsCardBuild = () => {
    let totalAmt = 0;
    overallList.forEach((item) => {
      totalAmt += item.price * item.quantity
    })
    return (
      <div className=' mx-4'>
        <h5 className='fw-bold'>Bill Details</h5>
        <div className='d-flex justify-content-between'>
          <p className='m-0'><CgNotes className='me-2' />Total </p>
          <p className='fw-bold'>{currency + " " + totalAmt}</p>
        </div>
        <div className='d-flex justify-content-between'>
          <p className='m-0'><TbTruckDelivery className='me-2' />Delivery Charge </p>
          <p style={{ color: primaryColor }} className='fw-bold'>Free</p>
        </div>
        <div className='d-flex justify-content-between'>
          <p className='m-0 fw-bold'>Grant Total </p>
          <h6 className='fw-bold'>{currency + " " + totalAmt}</h6>
        </div>
      </div>
    )
  }

  const inputDetailsBuild = () => {
    return (
      <div className='col-lg-8 col-md-12 col-sm-12 p-0'>
        <div className='jr-card mx-2'>
          <h2 className='fw-bold mt-3'>Delivery</h2>
          <form onSubmit={(e) => formSubmit(e)}>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 mt-3'>
                {/* <FormLabel className='text-black'>First Name</FormLabel> */}
                <TextField
                  id='firstName'
                  variant='outlined'
                  label="First Name"
                  value={firstName}
                  onChange={(e) => handleChange("firstName", "firstNameErr", e.target.value)}
                  error={firstNameErr}
                  fullWidth
                  required
                />

              </div>

              <div className='col-lg-12 col-md-12 col-sm-12 mt-3'>
                <TextField
                  multiline
                  id='address1'
                  // rows={"2"}
                  variant='outlined'
                  value={address1}
                  onChange={(e) => handleChange("address1", "address1Err", e.target.value)}
                  error={address1Err}
                  label="Address 1"
                  fullWidth
                  helperText={address1Err ? "This field is required" : "Flat, House No,Building"}
                  required
                />
              </div>

              <div className='col-lg-12 col-md-12 col-sm-12 mt-3'>
                <TextField
                  id='address2'
                  multiline
                  rows={"2"}
                  variant='outlined'
                  label="Address 2"
                  value={address2}
                  onChange={(e) => handleChange("address2", "address2Err", e.target.value)}
                  error={address2Err}
                  helperText={address2Err ? "This field is required" : "Area, Street, Village, City"}
                  fullWidth
                />
              </div>

              <div className='col-lg-12 col-md-12 col-sm-12 mt-3'>
                <TextField
                  id='landMark'
                  variant='outlined'
                  label="Landmark"
                  value={landMark}
                  onChange={(e) => handleChange("landMark", "landMarkErr", e.target.value)}
                  error={landMarkErr}
                  helperText={landMarkErr ? "This field is required" : ""}
                  fullWidth
                  required
                />
              </div>
              <div className='col-lg-6 col-md-12 col-sm-12 mt-3'>
                <FormControl fullWidth>
                  <InputLabel id="country">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="country"
                    label="Country"
                    onChange={(e) => handleChange("country", "countryErr", e.target.value)}
                    value={country}
                    error={countryErr}
                  >
                    <MenuItem value={"india"}>India</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className='col-lg-6 col-md-12 col-sm-12 mt-3'>
                <TextField
                  id='pincode'
                  type='number'
                  variant='outlined'
                  label="Pincode"
                  onChange={(e) => handleChange("pincode", "pincodeErr", e.target.value)}
                  value={pincode}
                  error={pincodeErr}
                  fullWidth
                  required
                />
              </div>
              <div className='col-lg-6 col-md-12 col-sm-12 mt-3'>
                <Autocomplete
                  disablePortal
                  id='state'
                  options={stateList}
                  getOptionLabel={(option) => option.name}
                  value={stateList.find((item) => item.name === state) || null}
                  onChange={(e, val) => handleChange("state", "stateErr", val.name)}
                  renderInput={(params) => <TextField
                    {...params}
                    label="State"
                    error={stateErr}
                    fullWidth
                    required />}
                />
              </div>
              <div className='col-lg-6 col-md-12 col-sm-12 mt-3'>
                <TextField
                  id='district'
                  variant='outlined'
                  label="District"
                  onChange={(e) => handleChange("district", "districtErr", e.target.value)}
                  value={district}
                  error={districtErr}
                  fullWidth
                  required
                />
              </div>


              <div className='col-lg-6 col-md-12 col-sm-12 mt-3'>
                <TextField
                  id="phoneNumber"
                  type='number'
                  onChange={(e) => handleChange("phoneNumber", "phoneNumberErr", e.target.value)}
                  variant="outlined"
                  label="Phone Number"
                  value={phoneNumber}
                  error={phoneNumberErr}
                  inputProps={{
                    maxLength: 10, // Now works correctly
                  }}
                  fullWidth
                  required
                />

              </div>

              <div className='d-flex justify-content-end mt-3'>
                <Button type='submit' variant='contained'
                  sx={{
                    backgroundColor: 'primary.main', // Use primary color for background
                    color: 'white', // Text color (optional)
                    '&:hover': {
                      backgroundColor: 'primary.dark', // Darker shade of primary color on hover
                    },
                  }}
                  onClick={() => paySubmitBtnClick()}>proceed to pay</Button>
              </div>

            </div>
          </form>
        </div>
      </div>
    )
  }

  const handleChangeRadioButton = (val) => {
    setSelectedValue(val); // Update state when selection changes
  };


  const paymentMethodHtmlBuild = () => {
    return (
      <div className='col-lg-6 col-md-12 col-sm-12'>
        <div className="jr-card">
          <span onClick={() => handleChangeRadioButton(2)}>
            <Radio
              color="primary"
              checked={selectedValue === 2} // Ensure correct radio is selected
              // onChange={(e)=> handleChangeRadioButton(e, 2)}
              value="a"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
              disabled
            />
            Cash On Delivery
          </span>

          <div>
            <span onClick={() => handleChangeRadioButton(1)}>
              <Radio
                color="primary"
                checked={selectedValue === 1} // Ensure correct radio is selected
                // onChange={(e)=> handleChangeRadioButton(e, 1)}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
              />
              Pay by UPI and Cards</span>
          </div>
        </div>

        <div className='d-flex justify-content-end'>
          <Button onClick={() => backBtnClick()} variant='contained' size='samll' color='secondary' className='me-2'>Back</Button>

          <Button onClick={() => proceedToPayCall()} variant='contained' size='samll' color='primary'>Proceed Pay</Button>

        </div>

      </div>
    )
  }

  const backBtnClick = () => {
    setShowNext(false)
  }
  const proceedToPayCall = () => {
    if (selectedValue === 1) {
      submitApiCallFun()
    } else {
      cashOnDeliveryApiCall()
    }
  }

  const cashOnDeliveryApiCall = () => {
    const method = "POST";
    const url = "verify-payment";
    let totalAmt = 0;
    overallList.forEach((item) => {
      totalAmt += item.price * item.quantity
    })
    const data = {
      "user_id": getUserData() && getUserData().user_id ? getUserData().user_id : "",
      "payment_type": 2,
      "currency": currency,
      "amount": totalAmt,
      "products": overallList,
      "shippingAddress": {
        "firstName": formInputs.firstName ?? "",
        "address1": formInputs.address1 ?? "",
        "address2": formInputs.address2 ?? "",
        "landMark": formInputs.landMark ?? "",
        "phoneNumber": formInputs.phoneNumber ?? "",
        "district": formInputs.district ?? "",
        "state": formInputs.state ?? "",
        "country": formInputs.country ?? "",
        "pincode": formInputs.pincode ?? ""
      }
    }
    axiosApiCallFun(method, url, data, "verifyPaymentReq");
  }
  return (
    <div style={{ backgroundColor: lightPrimary }} className={showNext ? 'vh-100' : ""}>
      <Loader open={showLoader} />
         <MySnackbar
              open={alertData.openSnakbar}
              type={alertData.openSnakbarType}
              variant="filled"
              message={alertData.openSnakbarMsg}
              duration={3000}
              handleClose={() =>
                setAlertData((prev) => ({ ...prev, openSnakbar: false }))
              }
            />

      <div className='row mx-1 flex-column-reverse'>
        {
          showNext === false ?
            inputDetailsBuild()
            :
            paymentMethodHtmlBuild()
        }

        <div className=' col-lg-4 mt-2 col-md-12 col-sm-12'>
          <div className='jr-card card-fixed col-lg-4 col-md-12 col-sm-12'>
            {billDetailsCardBuild()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
