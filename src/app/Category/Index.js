import React, { useEffect, useState } from 'react'
import "./category.css"
import { useNavigate } from 'react-router-dom'
import { Skeleton, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

const Index = ({ categoryList }) => {
    const base_url = process.env.REACT_APP_BASE_URL;
    const dispatch = useDispatch()
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

    const { overallCategory, seletonArr, baseUrl } = state;
    const categorySelectFun = (item) => {
        navigate(`/categoty/${item._id}`)
        dispatch({type:"ROUTE_UPDATE", payload:`/categoty/${item._id}`})

    }
    return (
        <div className='mt-3'>
            <Typography variant='h6' className='fw-bold pt-3 pb-2'>Explore By Categories</Typography>

            {overallCategory.length > 0 ?
                <div className='row p-0'>
                    {overallCategory.map((item) => {
                        return (
                            <div onClick={() => categorySelectFun(item)} className='category col-lg-2 col-md-3 col-sm-4 col-4 mb-2 pointer'>
                                <div> <img src={item.category_img} className=' w-100' alt='Redundant' /></div>
                                <div>
                                    <h4 className='text-center mt-2'>{item.name}</h4>
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
