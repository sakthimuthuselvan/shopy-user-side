import React, { useCallback, useState } from 'react'
import product1 from "../../Asset/product/product1.png"
import product3 from "../../Asset/product/product3.png"

import Product from '../Product/Product';
const Index = () => {
    const [state, setState] = useState({
        productList: [
            {
                product_id: "11111",
                product_name: "Onion",
                product_type: "vegitable",
                messure: "kg",
                size: 1,
                total_quantity: 3,
                old_price: 70,
                price: 50,
                is_whishList: 0,
                product_img: product3,
                is_offer: 0,
                offer_percentage: 40,
                add_cart: 0,
                currency: "₹",
            },
            {
                product_id: "11111",
                product_name: "Onion",
                product_type: "vegitable",
                messure: "kg",
                size: 1,
                total_quantity: 3,
                old_price: 70,
                price: 50,
                is_whishList: 0,
                product_img: product1,
                is_offer: 0,
                offer_percentage: 40,
                add_cart: 0,
                currency: "₹",
            },
            {
                product_id: "11121",
                product_name: "Onions",
                product_type: "vegitable",
                messure: "kg",
                size: 1,
                total_quantity: 0,
                old_price: 70,
                price: 50,
                is_whishList: 0,
                product_img: product1,
                is_offer: 1,
                offer_percentage: 40,
                add_cart: 0,
                currency: "₹",
            }
        ]
    })
    const { productList } = state;

    const setStateAgainFun = useCallback((check, clickedItem) => {
        if (check === "add") {
            setState(prevState => ({
                ...prevState,
                productList: prevState.productList.map(item => {
                    if (item.product_id === clickedItem.product_id) {
                        return { ...item, add_cart: 1 }; // Update the clicked item's add_cart property
                    }
                    return item; // Return unchanged item if it's not the clicked item
                })
            }));
        } else if (check === "cancel") {
            setState(prevState => ({
                ...prevState,
                productList: prevState.productList.map(item => {
                    if (item.product_id === clickedItem.product_id) {
                        return { ...item, add_cart: 0 }; // Update the clicked item's add_cart property
                    }
                    return item; // Return unchanged item if it's not the clicked item
                })
            }));
        }

    }, [productList]);

    const whishListBtnCallBack = useCallback((check, clickedItem) => {
        if (check === "add") {
            setState(prevState => ({
                ...prevState,
                productList: prevState.productList.map(item => {
                    if (item.product_id === clickedItem.product_id) {
                        return { ...item, is_whishList: 1 }; // Update the clicked item's add_cart property
                    }
                    return item; // Return unchanged item if it's not the clicked item
                })
            }));
        } else if (check === "remove") {
            setState(prevState => ({
                ...prevState,
                productList: prevState.productList.map(item => {
                    if (item.product_id === clickedItem.product_id) {
                        return { ...item, is_whishList: 0 }; // Update the clicked item's add_cart property
                    }
                    return item; // Return unchanged item if it's not the clicked item
                })
            }));
        }
    }, [productList])
    return (
        <div className='bg-grey'>
            <div className='px-3 mt-3'>
                <h3 className='title pt-3 pb-2'>Most Buying Products</h3>
                <div>
                    <div className='row p-0'>
                        {productList.map((item) => {
                            return (
                                <div className=' col-lg-2 col-md-3 col-sm-6 col-6 mb-2'>

                                    <Product
                                        productDetails={item}
                                        product_name={item.product_name}
                                        is_whishList={item.is_whishList}
                                        product_img={item.product_img}
                                        messure={item.messure}
                                        offer_percentage={item.offer_percentage}
                                        is_offer={item.is_offer}
                                        price={item.price}
                                        setStateAgainFun={setStateAgainFun}
                                        whishListBtnCallBack={whishListBtnCallBack}
                                    />
                                   
                                    <div>
                                        {
                                            
                                        }
                                    </div>
                                    {/* <div className=' img-card p-0 pt-2'>
                                        <div>
                                            <div className='p-3 pt-1'>
                                                <img src={item.product_img} alt='product' className='w-100' />
                                            </div>
                                            <div className='p-3 pt-0'>
                                                <div className='d-flex justify-content-between'>
                                                    <h5 className='product-title mb-0'>{item.product_name}</h5>
                                                    <div>{item.is_whishList ? <FavoriteIcon className='text-danger' /> : <FavoriteBorderIcon />}</div>
                                                </div>
                                                <div className='my-2 d-flex'>
                                                    <p className='m-0'>{item.messure}</p>
                                                    <div className='pl-1'>
                                                        {item.is_offer === 1 ?
                                                            <span className='bg-red p-1 px-1 rounded'><small className='text-white fs-10 bold'>{item.offer_percentage}% off</small></span>
                                                            : null}
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-between align-items-center'>

                                                    <h4 className='bold mb-0'>₹ {item.price}</h4>
                                                    <Button
                                                     variant='contained' 
                                                     className='bg-success'
                                                      size='small' 
                                                      onClick={()=> addBtnClick(item)}
                                                      >Add</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
