import React from "react";

const overview = React.lazy(() => import('../app/OverView/Index'))
const productDetails = React.lazy(() => import('../app/Product/ProductDetails'))
const AddtoCard = React.lazy(() => import('../app/AddtoCard/Index'))
const wishList = React.lazy(() => import('../app/wishList/Index'))
const deliveryDetail = React.lazy(() => import('../app/DeliveryAddress/Index'))
const categoryProducts = React.lazy(() => import('../app/Category/ProductList'))

const RouteList = [
    { path: "/", component: overview },
    { path: "/product/details/:id", component: productDetails },
    { path: "/add/to/card", component: AddtoCard },
    { path: "/wish-list", component: wishList },
    { path: "/delivery/details", component: deliveryDetail },
    { path: "/categoty/:id", component: categoryProducts }
]

export default RouteList;