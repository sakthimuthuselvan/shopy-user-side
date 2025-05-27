import React, { useEffect, useState } from 'react'
import HttpRequest from '../../Utilities/ApiCall/HttpRequest'
import MySnackbar from '../../AlertShow/Alert';
import { Skeleton, Typography } from '@mui/material';
import { getUserData } from '../../Utilities/Util';
import moment from "moment"

const Index = () => {
  const currency = localStorage.getItem("CURRENCY")
  const [overallData, setOverallData] = useState([])
  const [alertData, setAlertData] = useState({
    loader: false,
    openSnakbar: false,
    openSnakbarType: "",
    openSnakbarMsg: ""
  })
  const [orderStatusList] = useState([
    { name: "Order Placed", value: "1", color: "primary" },
    { name: "Handed to Courier", value: "2", color: "success" },
  ])
  useEffect(() => {
    prevOrdersListAPiCall()
  }, [])


  const prevOrdersListAPiCall = async () => {
    const user_data = getUserData()
    const method = "GET";
    const url = `orders/get/user/${user_data.user_id}`;
    const data = {}
    try {
      setAlertData((pre) => ({ ...pre, loader: true }))
      const response = await HttpRequest({ method, url, data });
      setAlertData((pre) => ({ ...pre, loader: false }))
      setOverallData(response.response_data ?? [])
    } catch (error) {
      setAlertData((pre) => ({
        ...pre,
        loader: false,
        openSnakbar: true,
        openSnakbarType: "error",
        openSnakbarMsg: error.response_message ? error.response_message : "Something went wrong"
      }))
    }
  }
  const SkeletonLoaderBuild = () => {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className='mt-3'>
            <Skeleton height={100} variant='rectangular' animation='wave' className='rounded' />
          </div>
        ))}
      </div>
    );
  };

  const cardContentBuild = () => {
    return (
      <div className='fs-12'>
        {overallData.map((item) => {
          if (item.products.length === 1) {
            let data = item.products[0]

            let statusVal = orderStatusList.find((each) => each.value === "1") || {}
            return (
              <div className='jr-card'>
                <div className='d-flex'>
                  <div>
                    <div style={{ width: 100, height: 100 }} className='bg-primary'>
                      <img src={data.cover_image} alt='cover_image' className='w-100 h-100' />
                    </div>
                  </div>
                  <div className='px-3'>
                    <div><b>Name:</b> {data.product_name}</div>
                    <div><b>Qty: {data.quantity} | Price: {currency + " " + item.amount}</b></div>
                    <div><b>Order ID:</b> {item.userOrderId}</div>
                    <div><b className={`text-${statusVal.color}`}>{statusVal.name}</b></div>
                    <div>
                      <Typography className='fs-10' variant='caption'>{moment().format("ll")}</Typography>
                    </div>
                  </div>
                </div>

              </div>
            )
          } else {
            let data = item.products[0]
            let statusVal = orderStatusList.find((each) => each.value === "1") || {}

            return (
              <div className="jr-card">
                <div className="d-flex">
                  {/* Image with overlay */}
                  <div style={{ width: 100, height: 100 }} className="position-relative">
                    <img
                      src={data.cover_image}
                      style={{ filter: "opacity(0.6)" }}
                      alt="cover_image"
                      className="w-100 h-100 object-fit-cover rounded"
                    />

                    {/* Overlay Badge */}
                    <div
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                      style={{ fontSize: 12 }}
                    >
                      +{item.products.length - 1}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="px-3 d-flex flex-column mt-3">
                    <span><b>Order ID:</b> {item.userOrderId}</span>
                    <div><b>{item.products.length} items | Price: {currency + " " + item.amount}</b></div>
                    <div><b className={`text-${statusVal.color}`}>{statusVal.name}</b></div>
                    <Typography variant="caption">{moment().format("ll")}</Typography>
                  </div>
                </div>
              </div>

            )
          }
        })}
      </div>
    )
  }
  return (
    <div className='mx-3'>
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
      {alertData.loader ?
        SkeletonLoaderBuild()
        :
        <div>
          {cardContentBuild()}
        </div>}


    </div>
  )
}

export default Index