import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../Product/Product";
import HttpRequest from "../../Utilities/ApiCall/HttpRequest";
import Loader from "../../Utilities/Loader/Loader";
import MySnackbar from "../../AlertShow/Alert";

const Index = () => {
    const location = useLocation();
    const [productList, setProductList] = useState([location.state])
    const [state, setState] = useState({
        showLoader: false,
        openSnakbar: false,
        openSnakbarType: "",
        openSnakbarMsg: ""
    })
    const [cateProduct, setCateProducts] = useState([])
    const { showLoader, openSnakbarMsg, openSnakbar, openSnakbarType } = state
    useEffect(() => {
        categoryProductsGet()
    }, [])

    const categoryProductsGet = () => {
        let url = "category/category/products"
        let data = {
            "category_id": location.state.category_id
        }
        axiosApiCallFun("POST", url, data, "CategoryProductsReq")
    }
    const categoryProductsGetFun = (response) => {
        const datas = response.response_data ? response.response_data : [];
        setCateProducts(datas)
    }
    const axiosApiCallFun = async (method, url, data, type) => {
        try {
            setState((pre) => ({ ...pre, showLoader: true }))
            const response = await HttpRequest({ method, url, data });
            setState((pre) => ({ ...pre, showLoader: false }))
            switch (type) {
                case "CategoryProductsReq":
                    categoryProductsGetFun(response);
                    break;
                default:
                    break;
            }
        } catch (error) {
            setState((prev) => ({
                ...prev,
                showLoader: false,
                openSnakbar: true,
                openSnakbarType: "error",
                openSnakbarMsg: error.response_message
                    ? error.response_message
                    : "Something went wrong",
            }));
        }
    };

    const filterCateProducts = cateProduct.filter((data) => data._id !== location.state._id)
    return ( // render()
        <div className="row">
            <Loader open={showLoader} />
            <MySnackbar open={openSnakbar} type={openSnakbarType} variant={"filled"} message={openSnakbarMsg} duration={3000} onClose={() => setState((pre) => ({ ...pre, openSnakbar: false }))} />

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
                        //   setStateAgainFun={setStateAgainFun}
                        />
                    </div>
                );
            })}

            {filterCateProducts.length > 0 && <div className="">
                <h5 className="mt-3 mx-2 fw-bold">Related Products</h5>
                <div className="row mt-2">
                    {filterCateProducts.map((item) => {
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
                                //   setStateAgainFun={setStateAgainFun}
                                />
                            </div>
                        );
                    })}

                </div>
            </div>}

        </div>
    );
};

export default Index;
