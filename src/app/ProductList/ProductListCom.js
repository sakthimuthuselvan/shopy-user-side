import React, { useCallback, useEffect, useState } from "react";
import Product from "../Product/Product";
import { Skeleton } from "@mui/material";
import "./productlist.scss";

const Index = ({ productLists }) => {
  const [state, setState] = useState({
    productList: productLists,
    skeletonArr: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  });

  useEffect(() => {
    setState((state) => ({
      ...state,
      productList: productLists,
    }));
  }, [productLists]);
  const { productList, skeletonArr } = state;

  const setStateAgainFun = useCallback(
    (check, clickedItem) => {
      if (check === "add") {
        setState((prevState) => ({
          ...prevState,
          productList: prevState.productList.map((item) => {
            if (item.product_id === clickedItem.product_id) {
              return { ...item, add_cart: 1 }; // Update the clicked item's add_cart property
            }
            return item; // Return unchanged item if it's not the clicked item
          }),
        }));
      } else if (check === "cancel") {
        setState((prevState) => ({
          ...prevState,
          productList: prevState.productList.map((item) => {
            if (item.product_id === clickedItem.product_id) {
              return { ...item, add_cart: 0 }; // Update the clicked item's add_cart property
            }
            return item; // Return unchanged item if it's not the clicked item
          }),
        }));
      }
    },
    [productList]
  );

  return (
    <>
      {productList.length > 0 ? (
        <div
          className="row p-0"
        >
          {productList.map((item) => {
            return (
              <div className=" col-lg-2 col-md-3 col-sm-6 col-6 mb-2 px-1">
                <Product
                  productDetail={item}
                  product_name={item.product_name}
                  is_whishList={item.is_whishList}
                  product_img={item.cover_image}
                  messure={item.messure}
                  offer_percentage={item.offer_percentage}
                  is_offer={item.is_offer}
                  price={item.price}
                  setStateAgainFun={setStateAgainFun}
                />
              </div>
            );
          })}

{productList.map((item) => {
            return (
              <div className=" col-lg-2 col-md-3 col-sm-6 col-6 mb-2 px-1">
                <Product
                  productDetail={item}
                  product_name={item.product_name}
                  is_whishList={item.is_whishList}
                  product_img={item.cover_image}
                  messure={item.messure}
                  offer_percentage={item.offer_percentage}
                  is_offer={item.is_offer}
                  price={item.price}
                  setStateAgainFun={setStateAgainFun}
                />
              </div>
            );
          })}

{productList.map((item) => {
            return (
              <div className=" col-lg-2 col-md-3 col-sm-6 col-6 mb-2 px-1">
                <Product
                  productDetail={item}
                  product_name={item.product_name}
                  is_whishList={item.is_whishList}
                  product_img={item.cover_image}
                  messure={item.messure}
                  offer_percentage={item.offer_percentage}
                  is_offer={item.is_offer}
                  price={item.price}
                  setStateAgainFun={setStateAgainFun}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="row">
          {skeletonArr.map((item) => {
            return (
              <div className="card col-lg-2 col-md-2 col-sm-6 col-6">
                <Skeleton
                  variant="rounded"
                  className="mt-3"
                  width={"100%"}
                  height={150}
                />
                <Skeleton
                  variant="rounded"
                  className="mt-1"
                  width={"100%"}
                  height={20}
                />

                <Skeleton
                  variant="rounded"
                  className="mt-1"
                  width={"70%"}
                  height={15}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Index;
