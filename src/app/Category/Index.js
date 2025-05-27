import React, { useEffect, useState } from 'react'
import "./category.css"
import { useNavigate } from 'react-router-dom'
import { Skeleton, Typography } from '@mui/material'

const Index = ({ categoryList }) => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate()
  const [state, setState] = useState({
    overallCategory: [],
    seletonArr: [{}, {}, {}, {}, {}, {}],
    baseUrl: base_url
  })

  useEffect(() => {
    setState((state) => ({
      ...state,
      overallCategory: categoryList
    }))
  }, [categoryList])

  const { overallCategory, seletonArr } = state;
  const categorySelectFun = (item) => {
    navigate(`/categoty/${item._id}`)
  }
  return (
    <div className='mt-3'>
      <Typography variant='h5' className='fw-bold pt-3 pb-2'>Explore By Categories</Typography>

      {overallCategory.length > 0 ?
        <div className='row p-0'>
          {overallCategory.map((item) => {
            return (
              <div onClick={() => categorySelectFun(item)} className='category col-lg-2 col-md-3 col-sm-4 col-4 mb-2 pointer'>
                <div> <img src={item.category_img} className=' w-100' alt='Redundant' /></div>
                <div>
                  <h6 className='text-center fw-bold mt-2'>{item.name}</h6>
                </div>
              </div>

            )
          })}
        </div>
        :
        <div className='row'>
          {
            seletonArr.map((item) => {
              return (
                <div className='category col-lg-2 col-md-3 col-sm-4 col-4 mb-2 pointer'>
                  <Skeleton variant="rounded" width={"100%"} height={100} />

                </div>
              )
            })
          }
        </div>


      }
    </div>
  )
}

export default Index
