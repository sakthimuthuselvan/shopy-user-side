import React, { useState } from 'react'
import "./style.scss"
import { Autocomplete, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import stateList from "../../JsonList/StateList/Index.json";
import pinCodeList from "../../JsonList/StateList/pincode.json";
import { useSelector } from 'react-redux';
import { TbTruckDelivery } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';

console.log("StateList ", stateList);
function Index() {
  const gloablState = useSelector((state)=> state)
  const [overallList] =useState(gloablState.addCartProduct)
  console.log("overallList ",overallList);
  const [formInputs, setFormInputs] = useState({
    firstName: "",
    firstNameErr: false,
    address1: "",
    address1Err: false,
    address2: "",
    address2Err: false,
    country: "india",
    countryErr: false,
    state: { code: "", name: "" },
    stateErr: false,
    district: "",
    districtErr: false,
    phoneNumber: "",
    phoneNumberErr: false,
    pincode: "",
    pincodeErr: false,
    landMark: "",
    landMarkErr: false
  })

  const { firstName, firstNameErr, address1, address1Err, address2, address2Err, district, districtErr, country, countryErr, phoneNumber, phoneNumberErr, state, stateErr, pincode, pincodeErr, landMark, landMarkErr } = formInputs;

  const spaceRemoveFun = (name) => {
    let space_remove = name.split(" ").join("").toLowerCase()
    return space_remove
  }

  const handleChange = (name, err, value) => {
    if (name === "pincode") {
      setFormInputs((pre) => ({
        ...pre,
        [name]: value,
        [err]: false,
      }))
      if (value.length === 6) {
        const data = pinCodeList.find((item) => value === item.Pincode)
        console.log("data ", data);

        const stateName = stateList.find((item) => spaceRemoveFun(item.name) === spaceRemoveFun(data.StateName))
        console.log("stateName ", stateName);
        console.log("District ", data.District);

        setFormInputs((pre) => ({
          ...pre,
          state: stateName,
          district:data.District
        }))
      }

    } else {
      setFormInputs((pre) => ({
        ...pre,
        [name]: value,
        [err]: false
      }))
    }

  }

  const formSubmit=(event)=>{
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
    } else if (!pincode) {
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
    } else if (!phoneNumber) {
      setFormInputs((pre) => ({
        ...pre,
        phoneNumberErr: true
      }))
      document.getElementById("district").focus()
    } else {
      alert("hii")
      console.log("formInputs ", formInputs);
    }
  }
  

  const billDetailsCardBuild = () => {
    let totalAmt = 0;
    let currency = "";
    let shipping = 0
    overallList.forEach((item) => {
      console.log("sasdadfd ", item.price * item.quantity);
      totalAmt += item.price * item.quantity
      currency = item.currency
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
          <p className='fw-bold text-success'>Free</p>
        </div>
        <div className='d-flex justify-content-between'>
          <p className='m-0 fw-bold'>Grant Total </p>
          <h6 className='fw-bold'>{currency + " " + totalAmt}</h6>
        </div>
      </div>
    )
  }

  const inputDetailsBuild=()=>{
    return(
      <div className='col-lg-8 col-md-12 col-sm-12 p-0'>
          <div className='jr-card mx-2'>
            <h2 className='fw-bold mt-3'>Delivery</h2>
          <form onSubmit={(e)=> formSubmit(e)}>
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
                  value={state}
                  onChange={(e, val) => handleChange("state", "stateErr", val)}
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
                  id='phoneNumber'
                  type='number'
                  onChange={(e) => handleChange("phoneNumber", "phoneNumberErr", e.target.value)}
                  variant='outlined'
                  label="Phone Number"
                  value={phoneNumber}
                  error={phoneNumberErr}
                  fullWidth
                  required
                />
              </div>

              <div className='d-flex justify-content-end mt-3'>
                <Button type='submit' variant='contained' color='success' onClick={() => paySubmitBtnClick()}>proceed to pay</Button>
              </div>

            </div>
          </form>
          </div>
        </div>
    )
  }

  return (
    <div className='light-green'>
      <div className='row mx-1 flex-column-reverse'>
        {inputDetailsBuild()}
        <div className='col-lg-4 mt-2 col-md-12 col-sm-12'>
          <div className='card-fixed col-lg-4 col-md-12 col-sm-12'>
          {billDetailsCardBuild()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
