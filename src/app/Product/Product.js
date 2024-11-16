import React, { useEffect, useState } from 'react'
import product1 from "../../Asset/product/product1.png"
import { Button, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import proImg from "./imag.png"
const Product = (props) => {
  const { setStateAgainFun, productDetail } = props;
  const base_url = process.env.REACT_APP_BASE_URL;
  const cartName = "_CART_"
  const wishListName = "WISH_LIST"


  const overallProducts = useSelector((state) => state.overallProducts);
  console.log("overallProductsoverallProducts ", overallProducts);
  const [state, setState] = useState({
    productDetails: [],
    currency: "₹",
  })


  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { productDetails, currency } = state;
  useEffect(() => {
    setState((state) => ({
      ...state,
      productDetails: productDetail
    }))
  }, [productDetail])

  const addBtnClick = (item) => {
    // setStateAgainFun("add", item)
    // dispatch({ type: "ADD_CART", payload: item })


    let prev = localStorage.getItem(cartName)
    prev = prev ? JSON.parse(prev) : []

    localStorage.setItem(cartName, JSON.stringify([...prev, item._id]))

    const arr = []
    let selected = {}


    overallProducts.forEach((data) => {
      if (data._id === item._id) {
        selected = { ...data, "add_cart": true };
        arr.push(selected);
      } else if (!arr.some(product => product._id === data._id)) {
        arr.push(data);
      }
    });

    dispatch({ type: "PRODUCTS_LIST", payload: arr })
    setState((state) => ({
      ...state,
      productDetails: selected
    }))


  }

  const cancelBtnClick = (item) => {
    // setStateAgainFun("cancel", item)
    // dispatch({ type: "CANCEL_CART", payload: item })


    let prev = localStorage.getItem(cartName)
    prev = prev ? JSON.parse(prev) : []

    localStorage.setItem(cartName, JSON.stringify([...prev, item._id]))

    const arr = []
    let selected = {}


    overallProducts.forEach((data) => {
      if (data._id === item._id) {
        selected = { ...data, "add_cart": false };
        arr.push(selected);
      } else if (!arr.some(product => product._id === data._id)) {
        arr.push(data);
      }
    });

    dispatch({ type: "PRODUCTS_LIST", payload: arr })
    setState((state) => ({
      ...state,
      productDetails: selected
    }))
  }

  const whishListBtnClick = (item) => {
    console.log("item _", item._id);
    if (item.is_whishList === 1) {
      let prev = localStorage.getItem(wishListName)
      console.log(prev);
      prev = prev ? JSON.parse(prev) : []
      const filterArr = prev.filter((data) => data !== item._id)
      localStorage.setItem(wishListName, JSON.stringify(filterArr))

      const arr = []
      let selected = {}
      overallProducts.forEach((data) => {
        if (data._id === item._id) {
          selected = { ...data, "is_whishList": 0 };
          arr.push(selected);
        } else if (!arr.some(product => product._id === data._id)) {
          arr.push(data);
        }
      });


      dispatch({ type: "PRODUCTS_LIST", payload: arr })
      setState((state) => ({
        ...state,
        productDetails: selected
      }))

    } else {
      let prev = localStorage.getItem(wishListName)
      prev = prev ? JSON.parse(prev) : []

      localStorage.setItem(wishListName, JSON.stringify([...prev, item._id]))

      const arr = []
      let selected = {}


      overallProducts.forEach((data) => {
        if (data._id === item._id) {
          selected = { ...data, "is_whishList": 1 };
          arr.push(selected);
        } else if (!arr.some(product => product._id === data._id)) {
          arr.push(data);
        }
      });

      dispatch({ type: "PRODUCTS_LIST", payload: arr })
      setState((state) => ({
        ...state,
        productDetails: selected
      }))

    }
  }

  const productDetailBtnClick = (product) => {
    if (productDetails.total_quantity !== 0) {
      navigate(`/product/details/${product._id}`)
      dispatch({ type: "ROUTE_UPDATE", payload: `/product/details/${product._id}` })

    }
  }
  let demandStocks = false;
  if (productDetails.total_quantity > 0 && productDetails.total_quantity <= 3) {
    demandStocks = true
  }

  // console.log("productDetails ", productDetails);
  return (
    <div className={productDetails.total_quantity !== 0 ? "pointer" : 'overall-out-off-stock'} >
      <div className='img-card p-0 pt-2'>
        <div  style={{display:"flex",flexDirection:"column",alignContent:"space-around"}} className=''>
          <div  onClick={() => productDetailBtnClick(productDetails)} className='p-3 pt-1 h-25'>
            <img src={productDetails.cover_image} alt='product' className='w-100' />
          </div>




          <div style={{height:150}}>
            <div className='overall-few-stocks-label'>
              {demandStocks ?
                <div className='few-stocks-label p-3 py-0 text-danger'><small className='bold fs-10'>Only few stocks left</small></div>
                : null}
            </div>
            <div className='p-3 pt-1'>
              <div className='d-flex justify-content-between'>
                <Typography className='mb-0 fw-bold fs-12'>{productDetails.product_name}</Typography>
                <div onClick={() => whishListBtnClick(productDetails)}>{productDetails.is_whishList === 1 ? <FavoriteIcon className='text-danger' /> : <FavoriteBorderIcon />}</div>
              </div>
              <div className='my-0 mt-0 d-flex'>
                <p className='m-0'>{productDetails.messure ? productDetails.messure : null}</p>
                <div className='pl-1'>
                  {productDetails.is_offer === 1 ?
                    <span className='bg-red p-1 px-1 rounded'><small className='text-white fs-10 bold'>{productDetails.offer_percentage}% off</small></span>
                    : null}
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center mt-2'>
                <div className='w-50 mt-1 d-flex justify-content-between align-items-center'>
                  <h6 className='title'>{currency + productDetails.price}</h6>
                  {productDetails.is_offer === 1 ?
                    <h6 className='text-gray mx-1 '><strike>{currency + productDetails.old_price}</strike></h6>
                    : null
                  }
                </div>
                {productDetails.total_quantity !== 0 ?
                  <div>
                    {productDetails.add_cart ?
                      <Button
                        variant='contained'
                        className='bg-secondary text-black bold'
                        size='small'
                        onClick={() => cancelBtnClick(productDetails)}
                      ><span className='bold'>Cancel</span></Button>
                      :
                      <Button
                        variant='contained'
                        className='btn-primary'
                        size='small'
                        onClick={() => addBtnClick(productDetails)}
                      ><span className='bold'>Add</span></Button>
                    }
                  </div> : <div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {productDetails.total_quantity === 0 ?
        <div className='out-off-stocks justify-content-center align-items-center'>
          <div className='text-danger bold border border-danger'>
            <span className='px-2 py-1'>Out Of Stocks</span>
          </div>
        </div> : null}
    </div>
  )
}

export default Product
