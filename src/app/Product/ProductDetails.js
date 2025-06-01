import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import HttpRequest from '../../Utilities/ApiCall/HttpRequest';
import { Button, Skeleton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../Redux/Features/CartSlice';
import DOMPurify from 'dompurify';

const ProductDetails = () => {
  const cartProducts = useSelector(state => state.cart.cartProducts)
  const currency = localStorage.getItem("CURRENCY")
  const dispatch = useDispatch()
  const { id } = useParams(); // Accessing the dynamic parameter ":id"

  const [state, setState] = useState({
    overallDetails: {},
    skeletonShow: false,
    overallProducts: []
  })
  const { overallDetails } = state;
  useEffect(() => {
    if (id) {
      productDetailsAPiCall(id)
    }
  }, [id, cartProducts])

  const productDetailsAPiCall = async (id) => {
    setState((state) => ({ ...state, skeletonShow: true }))
    const method = "Post";
    const url = "product/get/product/details";
    const data = {
      "product_id": id
    }
    try {
      const response = await HttpRequest({ method, url, data });
      setState((state) => ({
        ...state,
        overallDetails: response.response_data ? response.response_data : {},
        skeletonShow: false
      }))
    } catch (error) {

    }
  }

  const cancelBtnClick = (item) => {
    // remove from the cart API call
    dispatch(removeFromCart(item))

  }

  const addBtnClick = (item) => {
    //Add to cart API call
    dispatch(addToCart(item))
  }

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    focus: false,
  };
  const isCheckCart = cartProducts.map((item) => item._id).includes(id)
  return (
    <div className=''>
      {Object.keys(overallDetails).length > 0 ?
        <div className='row m-0'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12 py-3 d-flex justify-content-center'>
            <div className='border w-100 py-2'>
              {overallDetails.product_images.length > 1 ? <Slider {...settings}>
                {overallDetails.product_images.map((item) => {
                  return (
                    <div className='d-flex justify-content-center'>
                      <img src={item} className='' alt='Redundant' height={350} />
                    </div>
                  )
                })}
              </Slider>
                :
                <div className='d-flex justify-content-center'>
                  <img src={overallDetails.product_images[0]} className='' alt='Redundant' height={350} />
                </div>}
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12 mt-3 pl-2'>
            <div className='w-90 mx-auto'>
              <div className='d-flex justify-content-between'>
                <Typography variant='subtitle1' className='fw-bold mt-2'>{overallDetails.product_name}</Typography>
                {/* <div className="mr-5 mt-2" onClick={() => whishListBtnClick(overallDetails)}>{overallDetails.is_whishList === 1 ? <FavoriteIcon className='text-danger' /> : <FavoriteBorderIcon />}</div> */}

              </div>
              <h6 className='text-grey mt-0'>{overallDetails.messure}</h6>
              <div className='d-flex mt-3'>
                <h4 className='title'>{currency + " " + overallDetails.price}</h4>

                {overallDetails.is_offer === 1 ?

                  <h5 className='text-gray mx-3 '><strike>{currency + overallDetails.old_price}</strike></h5>
                  : null
                }
              </div>
              <div>
                {overallDetails.is_offer === 1 ?
                  <span className='bg-red p-1 px-3 py-1 rounded'><small className='text-white bold'>{overallDetails.offer_percentage}% off</small></span>
                  : null}
              </div>

              <div className='mt-4'>
                {isCheckCart ?
                  <Button
                    sx={{
                      backgroundColor: 'secondary.main', // Use primary color for background
                      color: 'white', // Text color (optional)
                      '&:hover': {
                        backgroundColor: 'secondary.dark', // Darker shade of primary color on hover
                      },
                    }}
                    variant='contained'
                    className='text-white bold'
                    size='small'
                    onClick={() => cancelBtnClick(overallDetails)}
                  ><span className='bold'>Cancel</span></Button>
                  :
                  <Button
                    sx={{
                      backgroundColor: 'primary.main', // Use primary color for background
                      color: 'white', // Text color (optional)
                      '&:hover': {
                        backgroundColor: 'primary.dark', // Darker shade of primary color on hover
                      },
                    }}
                    variant='contained'
                    className='py-2 px-5'
                    size='small'
                    onClick={() => addBtnClick(overallDetails)}
                  ><span className='bold'>Add</span></Button>
                }
              </div>
            </div>
            <div className='border-top mt-4'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(overallDetails.description) }} />
            </div>
          </div>
        </div> :
        <div className='row m-0'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12 py-3 d-flex justify-content-center'>
            <Skeleton variant="rounded" width={"100%"} height={300} />
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-12 py-3'>
            <Skeleton variant="rounded" width={"100%"} height={80} />
            <div>
              <Skeleton variant="rounded" className="mt-3" width={"80%"} height={30} />
              <Skeleton variant="rounded" className="mt-3" width={"60%"} height={30} />
              <div className='d-flex justify-content-between w-75'>
                <Skeleton variant="rounded" className="mt-3" width={"50%"} height={30} />
              </div>
              <Skeleton variant="rounded" className="mt-3" width={"30%"} height={15} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ProductDetails
