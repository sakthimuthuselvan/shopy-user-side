import React, { useCallback, useEffect, useState } from "react";
import Product from "../Product/Product";
import "./productlist.scss";
import NoRecordsFound from "../../Utilities/NoRecordsFound";
import { Skeleton } from "@mui/material";

const Index = ({ loader, productLists }) => {
  const [state, setState] = useState({
    productList: [],
    skeletonArr: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  });
  const { skeletonArr } = state;
  useEffect(() => {
    setState((state) => ({
      ...state,
      productList: productLists,
    }));
  }, [productLists]);

  const { productList } = state;

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
    []
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

        </div>
      ) : loader ? <div className="row">
        {skeletonArr.map((item) => {
          return (
            <div className=" p-2 card col-lg-2 col-md-2 col-sm-6 col-6">
              <Skeleton
                variant="rounded"
                // className="m"
                width={"100%"}
                height={120}
              />
                 <Skeleton
                variant="rounded"
                className="mt-2"
                width={"80%"}
                height={20}
              />
              <Skeleton
                variant="rounded"
                className="mt-2"
                width={"30%"}
                height={10}
              />
            </div>
          );
        })}
      </div> : (
        <div>
          <NoRecordsFound message="Sorry, No Proucts found" />
        </div>
      )}
    </>
  );
};

export default Index;
