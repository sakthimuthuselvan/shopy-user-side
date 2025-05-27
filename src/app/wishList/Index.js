import React, { Suspense, useState } from 'react'
import { Skeleton } from '@mui/material';
import "./wishlist.scss"
import { useSelector } from 'react-redux';

const ProductListCom = React.lazy(() => import("../ProductList/ProductListCom"))
const Index = () => {
  const globalState = useSelector(state => state)
  const [skeletonArr] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},])
  const [overallList] = useState(globalState.addWhishList)

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
