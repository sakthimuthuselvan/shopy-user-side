import React, { Suspense, useEffect, useState } from 'react'
import { useNavigate, useParams, } from 'react-router-dom'
import HttpRequest from '../../Utilities/ApiCall/HttpRequest';
const ProductListCom = React.lazy(() => import("../ProductList/ProductListCom"))

const ProductList = () => {
  const { id } = useParams(); // Accessing the dynamic parameter ":id"

  const [productsList, setProductsList] = useState([])

  useEffect(() => {
    console.log(id);
    apiCall()
  }, [])


  const apiCall = async () => {
    const method = "Post";
    const url = "category/category/products";
    const data = {
      "category_id": id
    }

    try {
      const response = await HttpRequest({ method, url, data });
      console.log(response);
      setProductsList(response.response_data)
    } catch (error) {
      // setState((pre) => ({
      //   ...pre,
      //   openSnakbar: true,
      //   openSnakbarType: "error",
      //   openSnakbarMsg: error.response_message ? error.response_message : "Something went wrong"

      // }))
      console.log(error);
    }
  }
  return (
    <div>
      <Suspense fallback={<h1> </h1>}><ProductListCom productLists={productsList} /></Suspense>
    </div>
  )
}

export default ProductList
