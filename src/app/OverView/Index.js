import React, { Suspense, useEffect, useState } from 'react'
import Loader from '../../Utilities/Loader/Loader';
import "./overview.css"
import SliderCom from '../Slider/SliderCom';
import CategoryList from "../Category/Index"
import AddvertismentCards from "../AddvertismentCard/index";
import { encrypt } from '../../Utilities/Util';
import HttpRequest from '../../Utilities/ApiCall/HttpRequest';
import MySnackbar from '../../AlertShow/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const ProductListCom = React.lazy(() => import("../ProductList/ProductListCom"))

function OverView() {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch()

  const [state, setState] = useState({
    productLists: [],
    sliderOverall: [],
    addvertismentData: [],
    categoryList: [],

    openSnakbar: false,
    openSnakbarType: "",
    openSnakbarMsg: "",
  })

  const { sliderOverall, productLists, addvertismentData, categoryList, openSnakbar, openSnakbarType, openSnakbarMsg } = state;
  useEffect(() => {
    sliderListApiCall()
    productGetList()
    categoryListApiCall()
    advertisementApiCall()
  }, [])


  const advertisementApiCall = async () => {
    setState((state) => ({ ...state, skeletonShow: true }))
    const method = "GET";
    const url = "addvertisment/get/image/ads";
    const data = {}
    try {
      const response = await HttpRequest({ method, url, data });
      setState((state) => ({
        ...state,
        addvertismentData: response.response_data ? response.response_data : [],
        skeletonShow: false
      }))
    } catch (error) {
      setState((pre) => ({
        ...pre,
        openSnakbar: true,
        openSnakbarType: "error",
        openSnakbarMsg: error.response_message ? error.response_message : "Something went wrong"

      }))
    }
  }

  const categoryListApiCall = async () => {
    setState((state) => ({ ...state, skeletonShow: true }))
    const method = "GET";
    const url = "category/get/parentCategory";
    const data = {}
    try {
      const response = await HttpRequest({ method, url, data });
      setState((state) => ({
        ...state,
        // addvertismentData: addvertismentData,
        categoryList: response.response_data ? response.response_data : [],
        skeletonShow: false
      }))
    } catch (error) {
      setState((pre) => ({
        ...pre,
        openSnakbar: true,
        openSnakbarType: "error",
        openSnakbarMsg: error.response_message ? error.response_message : "Something went wrong"

      }))
    }
  }
  const productGetList = async () => {
    setState((state) => ({ ...state, skeletonShow: true }))
    const method = "GET";
    const url = "product/get/product";
    const data = {}
    try {
      const response = await HttpRequest({ method, url, data });
      const datas = response.response_data ? response.response_data : []

      setState((state) => ({
        ...state,
        productLists:  datas,
        skeletonShow: false
      }))
    } catch (error) {
      setState((pre) => ({
        ...pre,
        openSnakbar: true,
        openSnakbarType: "error",
        openSnakbarMsg: error.response_message ? error.response_message : "Something went wrong"
      }))
    }

  }
  const sliderListApiCall = async () => {
 
    setState((state) => ({ ...state, skeletonShow: true }))
    const method = "GET";
    const url = "slider/get/slider/banner";
    const data = {
      // "email": "email"
    }
    const encrypted = {
      data: encrypt(JSON.stringify(data))
    }
    try {
      const response = await HttpRequest({ method, url, data });
      setState((state) => ({
        ...state,
        sliderOverall: response.response_data ? response.response_data : [],
        // addvertismentData: addvertismentData,
        // categoryList: categoryList,
        skeletonShow: false
      }))
    } catch (error) {

      setState((pre) => ({
        ...pre,
        openSnakbar: true,
        openSnakbarType: "error",
        openSnakbarMsg: error.response_message ? error.response_message : "Something went wrong"

      }))

    }
  }


  return (
    <div>
      <Loader open={false} />
      <MySnackbar open={openSnakbar} type={openSnakbarType} variant={"filled"} message={openSnakbarMsg} duration={3000} handleClose={() => setState((pre) => ({ ...pre, openSnakbar: false }))} />

      <SliderCom SliderData={sliderOverall} />
      <div className='px-3'>
        <div>
          <AddvertismentCards addvertismentData={addvertismentData} />
          <CategoryList categoryList={categoryList} />
        </div>
      </div>

      <div className='bg-grey px-3 py-2 mt-3'>
        {/* <h3 className='title pt-3 pb-2'>Most Buying Products</h3> */}
        <Typography variant='h6' className='fw-bold pt-3 pb-2'>Most Buying Products</Typography>
        <div>
          <Suspense fallback={<h1> </h1>}><ProductListCom productLists={productLists} /></Suspense>
        </div>
      </div>

      {/* <div className=' px-3 mt-3'>
        <Typography variant='h6' className='fw-bold pt-3 pb-2'>Trending Cloths</Typography>

        <div>
          <Suspense fallback={<h1> </h1>}><ProductListCom productLists={productLists} /></Suspense>
        </div>
      </div> */}


      {/* <GoogleMap /> */}

      {/* <SignIn /> */}

    </div>
  )
}

export default OverView
