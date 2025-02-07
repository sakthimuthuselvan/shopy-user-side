import React, { useEffect, useState } from 'react'
import HttpRequest from '../../Utilities/ApiCall/HttpRequest';
import { encrypt } from '../../Utilities/Util';
import { Button, ButtonGroup, Skeleton, Typography } from '@mui/material';
import "./style.scss"
import WindowWidth from '../../Utilities';
import { CgNotes } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { updatedCartProducts } from '../../Redux/Features/CartSlice';

const Index = () => {
  const theme = useTheme();  // Access the current theme
  const primaryColor = theme.palette.primary.main;  // Get the primary color
const productList = useSelector(state => state.cart.cartProducts).map((item)=>({...item,"quantity":1}))

  const navigate = useNavigate()
 const currency = localStorage.getItem("CURRENCY")
const dispatch = useDispatch()
  const [skeletonShow, setskeletonShow] = useState()
  const [cartProducts,setCardProducts] = useState(productList)

  useEffect(() => {
    listApiCall()
  }, [])

  const listApiCall = async () => {
    setskeletonShow(true)
    const method = "Post";
    const url = "shopy/cart-list";
    const data = {
      "user_id": "6587f8b1d07e09ee517b9313",
      "product_id": ["663f179811d61a935fd6b712"]
    }
    try {
      const response = await HttpRequest({ method, url, data });
      // const data = {
      //   product_images: [product1, product1],
      //   product_name: "Onion (Nattu vengayam)",
      //   product_type: "vegitable",
      //   messure: "kg",
      //   size: 1,
      //   price: 50,
      //   is_whishList: 0,
      //   about_product: "",
      //   is_offer: 1,
      //   old_price: 70,
      //   offer_percentage: 40,
      //   add_cart: 0,
      //   currency: "₹",
      //   suggestion_product: [],
      //   total_quantity: 0,
      // }
      // setState((state) => ({
      //   ...state,
      //   overallDetails: data,
      //   skeletonShow: false
      // }))
    } catch (error) {

      console.log(error);

    }
  }

  const skeletonBuild = () => {
    return (
      <div>
        <div className='mt-4'>
          <Skeleton variant="rounded" width={"100%"} height={120} className='mt-2' />
          <Skeleton variant="rounded" width={"80%"} height={10} className='mt-2' />
          <Skeleton variant="rounded" width={"60%"} height={10} className='mt-2' />
        </div>
        <div className='mt-4'>
          <Skeleton variant="rounded" width={"100%"} height={120} className='mt-2' />
          <Skeleton variant="rounded" width={"80%"} height={10} className='mt-2' />
          <Skeleton variant="rounded" width={"60%"} height={10} className='mt-2' />
        </div>
        <div className='mt-4'>
          <Skeleton variant="rounded" width={"100%"} height={120} className='mt-2' />
          <Skeleton variant="rounded" width={"80%"} height={10} className='mt-2' />
          <Skeleton variant="rounded" width={"60%"} height={10} className='mt-2' />
        </div>
      </div>
    )
  }

  const skeletonBuild2 = () => {
    return (
      <div>
        <Skeleton variant="rounded" width={"100%"} height={200} className='mt-2' />
        <Skeleton variant="rounded" width={"100%"} height={30} className='mt-2' />
        <Skeleton variant="rounded" width={"80%"} height={50} className='mt-3' />
        <div className='d-flex justify-content-end'>
          <Skeleton variant="rounded" width={"50%"} height={50} className='mt-5' />
        </div>
      </div>
    )
  }


  const produdutBuild = () => {
    const size = WindowWidth()
    return (
      <div>
        {cartProducts.length > 0 && cartProducts.map((item) => {
          return (
            <div className='product-card jr-card p-0'>
              <div className='img-box'>
                <img src={item.cover_image} alt='' />
              </div>
              <div className='content-box'>
                <div className='col-lg-8 col-md-12 col-sm-12'>
                  <b>
                    <p className='fw-bold mb-2'>{item.product_name ? item.product_name : "-"}</p>
                  </b>
                  {item.messure ? <p>{item.messure}</p> : null}
                  <p className='mb-1'>{item.short_description}</p>
                  <h6 className='fw-bold'>{currency} {item.price}</h6>

                  {size !== "lg" ?
                    <div className='mb-4'>
                      <ButtonGroup
                       sx={{
                        backgroundColor: 'primary.main', // Use primary color for background
                        color: 'white', // Text color (optional)
                        '&:hover': {
                          backgroundColor: 'primary.dark', // Darker shade of primary color on hover
                        },
                      }}
                      variant="outlined" size='small'  aria-label="Basic button group">
                        <Button color='primary' className=' fw-bold text-white border border-right border-white' onClick={() => dropBtnClick(item)}>-</Button>
                        <Button className=' fw-bold text-white  border border-right border-white'>{item.quantity}</Button>
                        <Button className=' fw-bold text-white  border border-right border-white' onClick={() => addMoreBtnClick(item)}>+</Button>
                      </ButtonGroup>
                    </div> : null}
                </div>
                {size === "lg" ?
                  <div className='col-4'>
                    <ButtonGroup sx={{
                      backgroundColor: 'primary.main', // Use primary color for background
                      color: 'white', // Text color (optional)
                      '&:hover': {
                        backgroundColor: 'primary.dark', // Darker shade of primary color on hover
                      },
                    }} variant="outlined" size='large' aria-label="Basic button group">
                      <Button className=' fw-bold text-white border border-right border-white' onClick={() => dropBtnClick(item)}>-</Button>
                      <Button className=' fw-bold text-white  border border-right border-white'>{item.quantity}</Button>
                      <Button className=' fw-bold text-white  border border-right border-white' onClick={() => addMoreBtnClick(item)}>+</Button>
                    </ButtonGroup>
                  </div> :
                  null
                }
              </div>
            </div>
          )
        })}

        {size !== "lg" ? phoneBillDetails() : null}
      </div>
    )
  }

  const addMoreBtnClick = (item) => {
    console.log("addMoreBtnClick ", item);
    const overall = cartProducts.map((data) => {
      if (data._id === item._id) {
        return { ...data, "quantity": data.quantity + 1 }
      } else {
        return data
      }
    })
    setCardProducts(overall)
    dispatch(updatedCartProducts(overall))
    console.log("overall ", overall);

  }

  const dropBtnClick = (item) => {
    if (item.quantity > 0) {
      const overall = cartProducts.map((data) => {
        if (data._id === item._id) {
          return { ...data, "quantity": data.quantity - 1 }
        } else {
          return data
        }
      })
      setCardProducts(overall)
      dispatch(updatedCartProducts(overall))

    } else {
      console.log("remove api call");
    }

  }

  const totalBuild = () => {
    let totalAmt = 0;
    cartProducts.forEach((item) => {
      totalAmt += item.price * item.quantity
    })
    return (
      <div>
        <h4 className='fw-bold mb-2 text-center'>Bill Details</h4>

        <div className='mx-5 mt-5'>
          <div className='d-flex justify-content-between mt-2'>
            <p className='m-0'><CgNotes className='me-2' />Total </p>
            <p className='fw-bold'>{currency + " " + totalAmt}</p>
          </div>
          <div className='d-flex justify-content-between mt-2'>
            <p className='m-0'><TbTruckDelivery className='me-2' />Delivery Charge </p>
            <p style={{color: primaryColor}} className='fw-bold'>Free</p>
          </div>


          <div className=' border-top d-flex justify-content-between pt-4'>
            <p className='m-0 fw-bold'>Grant Total </p>
            <h6 className='fw-bold'>{currency + " " + totalAmt}</h6>
          </div>

          <div className='d-flex justify-content-center mt-5'>
            <button
            style={{backgroundColor: primaryColor}}
              className='submit-btn'
              onClick={() => payBtnClick()}
            >Proceed To Pay {currency ? currency : null} {getTotalAmt() ? getTotalAmt() : null} </button>
          </div>
        </div>
      </div>
    )
  }


  const phoneBillDetails = () => {
    let totalAmt = 0;
    let shipping = 0
    cartProducts.forEach((item) => {
      totalAmt += item.price * item.quantity
    })
    return (
      <div className='jr-card mx-4'>
        <h5 className='fw-bold'>Bill Details</h5>
        <div className='d-flex justify-content-between'>
          <p className='m-0'><CgNotes className='me-2' />Total </p>
          <p className='fw-bold'>{currency + " " + totalAmt}</p>
        </div>
        <div className='d-flex justify-content-between'>
          <p className='m-0'><TbTruckDelivery className='me-2' />Delivery Charge </p>
          <p style={{color: primaryColor}} className='fw-bold'>Free</p>
        </div>
        <div className='d-flex justify-content-between'>
          <p className='m-0 fw-bold'>Grant Total </p>
          <h6 className='fw-bold'>{currency + " " + totalAmt}</h6>
        </div>
      </div>
    )
  }


  const getTotalAmt = () => {
    let totalAmt = 0;
    cartProducts.forEach((item) => {
      totalAmt += item.price * item.quantity
    })
    return totalAmt
  }

  const payBtnClick = () => {
    navigate("/delivery/details")
  }


  const size = WindowWidth()
  return (
    <div className='cart-style h-100 light-green'>
      <div className='position-relative px-lg-3 '>
        <div className='overall'>
          <div className='box1 px-lg-4'>
            {cartProducts.length > 0 ?
              produdutBuild()

              : skeletonBuild()
            }
          </div>
          <div className='box2'>
            <div className='card-box'>
              <div>
                {cartProducts.length > 0 ?
                  totalBuild()
                  : skeletonBuild2()
                }
              </div>
            </div>
          </div>
        </div>
        {size !== "lg" ?
          <div className='position-fixed bottom-0 w-100'>
            <div className='jr-card m-0'>
              <div className='d-flex justify-content-center '>
                <button
                  style={{backgroundColor: primaryColor}}
                  onClick={() => payBtnClick()}
                  className='submit-btn rounded px-5 py-2'
                >Proceed To Pay {currency ? currency : null} {getTotalAmt() ? getTotalAmt() : null}</button>
              </div>
            </div>
          </div>
          : null
        }
      </div>


    </div>
  )
}

export default Index
