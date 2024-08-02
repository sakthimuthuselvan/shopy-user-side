import React, { Suspense, useEffect, useState } from 'react'
import HttpRequest from '../../Utilities/ApiCall/HttpRequest';
import { encrypt } from '../../Utilities/Util';
import { Skeleton } from '@mui/material';
import pructsImg from "./imag.png"
import "./wishlist.scss"
import { useSelector } from 'react-redux';

const ProductListCom = React.lazy(() => import("../ProductList/ProductListCom"))
const Index = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const globalState = useSelector(state => state)
  console.log("globalState ====== ",globalState.addWhishList);
  const [skeletonShow, setskeletonShow] = useState()
  const [skeletonArr] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},])
  const [overallList, setOverallList] = useState(globalState.addWhishList)

  return (
    <div className='wishlist-style vh-100 light-green'>
      <div className='px-3 h-100 light-green'>
        {overallList.length > 0 ?

          <Suspense fallback={<h1> </h1>}><ProductListCom productLists={overallList} /></Suspense>
          :
          <div className='row'>
            {skeletonArr.map((item) => {
              return (
                <div className='col-lg-2 col-md-2 col-sm-6 col-6'>
                  <Skeleton variant="rounded" className="mt-3" width={"100%"} height={150} />
                  <Skeleton variant="rounded" className="mt-1" width={"100%"} height={20} />

                  <Skeleton variant="rounded" className="mt-1" width={"70%"} height={15} />
                </div>

              )
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default Index
