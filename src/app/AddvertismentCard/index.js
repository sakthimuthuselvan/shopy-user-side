import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Index = ({ addvertismentData }) => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate()
  const [state, setState] = useState({
    overallData: [],
    baseUrl: base_url
  })

  useEffect(() => {
    setState((state) => ({
      ...state,
      overallData: addvertismentData
    }))
  }, [addvertismentData])


  const adCardClickFun = (data) => {
    if (data.navigate_category) {
      navigate(`categoty/${data.navigate_category}`)

    }
  }
  const { overallData } = state;
  return (
    <div>
      {
        overallData.length > 0 ?
          <div className='row  p-0 '>
            {overallData.map((item) => {
              return (
                <div onClick={() => adCardClickFun(item)} className='col-lg-4 col-md-4 col-sm-6 col-6 my-2 p-0 px-1'>
                  <img src={item.image} alt='Redundant' className='w-100' />
                </div>
              )
            })}
          </div>
          :
          <div className='row  p-0 '>
            <div className='col-lg-4 col-md-4 col-sm-6 col-6 my-2'>
              <Skeleton variant="rounded" width={"100%"} height={150} />
            </div>
            <div className='col-lg-4 col-md-4 col-sm-6 col-6 my-2'>
              <Skeleton variant="rounded" width={"100%"} height={150} />
            </div>
            <div className='col-lg-4 col-md-4 col-sm-6 col-6 my-2'>
              <Skeleton variant="rounded" width={"100%"} height={150} />

            </div>
            <div className='col-lg-4 col-md-4 col-sm-6 col-6 my-2'>
              <Skeleton variant="rounded" width={"100%"} height={150} />
            </div>
          </div>
      }


    </div>
  )
}

export default Index
