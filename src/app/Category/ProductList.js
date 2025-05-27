import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HttpRequest from '../../Utilities/ApiCall/HttpRequest';

const ProductListCom = React.lazy(() => import('../ProductList/ProductListCom'));

const ProductList = () => {
  const { id } = useParams();
  const [productsList, setProductsList] = useState([]);
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    const listApiCallFun = async () => {
      const method = 'Post';
      const url = 'category/category/products';
      const data = { category_id: id };
      setLoader(true)
      try {
        const response = await HttpRequest({ method, url, data });
        setLoader(false)
        setProductsList(response.response_data);
      } catch (error) {
        console.error(error);
      }
    };

    listApiCallFun();
  }, [id]);


  return (
    <div className="mx-3 mt-2">
      <Suspense fallback={<h1>Loading...</h1>}>
        <ProductListCom loader={loader} productLists={productsList} />
      </Suspense>
    </div>
  );
};

export default ProductList;
