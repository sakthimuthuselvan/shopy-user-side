import React, { Suspense, useEffect, useState } from 'react'
import HttpRequest from '../../Utilities/ApiCall/HttpRequest';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const MySnackbar = React.lazy(() => import("../../AlertShow/Alert"))
const AddvertismentCards = React.lazy(() => import("../AddvertismentCard/index"))
const SliderCom = React.lazy(() => import("../Slider/SliderCom"))
const CategoryList = React.lazy(() => import("../Category/Index"))
const MostBuyingCom = React.lazy(() => import("../MostBuying/MostBuying"))
const FooterCom = React.lazy(() => import("../Footer/FooterCom"))

function OverView() {
  const theme = useTheme();  // Access the current theme
  const secondaryColor = theme.palette.secondary.main;  // Get the secondaryColor color

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
        productLists: datas,
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
    const data = {}
    try {
      const response = await HttpRequest({ method, url, data });
      setState((state) => ({
        ...state,
        sliderOverall: response.response_data ? response.response_data : [],
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
      {openSnakbar ? <Suspense fallback={<h1> </h1>}>
        <MySnackbar open={openSnakbar} type={openSnakbarType} variant={"filled"} message={openSnakbarMsg} duration={3000} handleClose={() => setState((pre) => ({ ...pre, openSnakbar: false }))} />
      </Suspense> : null}

      <Suspense fallback={<h1> </h1>}>
        <SliderCom SliderData={sliderOverall} />
      </Suspense>

      <div className='px-3'>
        <div>
          <Suspense fallback={<h1> </h1>}>
            <AddvertismentCards addvertismentData={addvertismentData} />
          </Suspense>
          <Suspense fallback={<h1> </h1>}>
            <CategoryList categoryList={categoryList} />
          </Suspense>
        </div>
      </div>

      <div className='bg-grey px-3 py-2 mt-3'>
        {/* <h3 className='title pt-3 pb-2'>Most Buying Products</h3> */}
        <Typography variant='h6' className='fw-bold pt-3 pb-2'>Most Buying Products</Typography>
        <div>
          <Suspense fallback={<h1> </h1>}>
            <MostBuyingCom productLists={productLists} />
          </Suspense>
        </div>
      </div>

      <div style={{ backgroundColor: secondaryColor }} className='px-3'>
        <Suspense fallback={<h1> </h1>}>
          <FooterCom />
        </Suspense>
      </div>
    </div>
  )
}

export default OverView
