// src/redux/reducers.js
import pructsImg from "../app/Product/imag.png"

const initialState = {
  currentRoute: "/",
  auth: false,
  openPopup: false,
  dontClose: false,
  email: "",
  addCartProduct: [
    {
      "_id": { "$oid": "663f179811d61a935fd6b712" },
      "parent_category_id": { "$oid": "65da0170dbb93ba9587f0a4a" },
      "child_category_id": { "$oid": "660d786f23fef59185462b64" },
      "product_name": "Men's shirt",
      "messure": "",
      "total_quantity": 10,
      "quantity": 1,
      "old_price": 150,
      "price": 120,
      "cover_image": pructsImg,
      "product_images": [],
      "currency": "₹",
      "short_description": "Slimfit men branded cloth",
      "description": "<p>asasd</p>",
      "createdAt": { "$date": "2024-05-11T07:00:40.326Z" },
      "updatedAt": { "$date": "2024-05-11T07:00:40.326Z" },
      "__v": 0
    },
    {
      "_id": { "$oid": "663f179811d61a935fd6b715" },
      "parent_category_id": { "$oid": "65da0170dbb93ba9587f0a4a" },
      "child_category_id": { "$oid": "660d786f23fef59185462b64" },
      "product_name": "Men's Cotton Denim shirt",
      "messure": "",
      "total_quantity": 10,
      "quantity": 1,
      "old_price": 150,
      "price": 120,
      "cover_image": pructsImg,
      "product_images": [],
      "currency": "₹",
      "short_description": "Slimfit men branded cloth",
      "description": "<p>asasd</p>",
      "createdAt": { "$date": "2024-05-11T07:00:40.326Z" },
      "updatedAt": { "$date": "2024-05-11T07:00:40.326Z" },
      "__v": 0
    },
    {
      "_id": { "$oid": "663f179811d61a935fd6b713" },
      "parent_category_id": { "$oid": "65da0170dbb93ba9587f0a4a" },
      "child_category_id": { "$oid": "660d786f23fef59185462b64" },
      "product_name": "Men's Cotton Denim shirt",
      "messure": "",
      "total_quantity": 10,
      "quantity": 1,
      "old_price": 150,
      "price": 120,
      "cover_image": pructsImg,
      "product_images": [],
      "currency": "₹",
      "short_description": "Slimfit men branded cloth",
      "description": "<p>asasd</p>",
      "createdAt": { "$date": "2024-05-11T07:00:40.326Z" },
      "updatedAt": { "$date": "2024-05-11T07:00:40.326Z" },
      "__v": 0
    }
  ],
  addWhishList: [],
  overallProducts: [],
  // Define your initial state here
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // Define your action types and corresponding state changes here
    case "PRODUCTS_LIST":
      return { ...state, overallProducts: action.payload }
    case "Auth":
      return { ...state, auth: true }
    case "open_dialog":
      return { ...state, openPopup: action.payload }
    case "dont_close":
      return { ...state, dontClose: action.payload }
    case "email":
      return { ...state, email: action.payload }
    case "ADD_CART":
      return { ...state, addCartProduct: [...state.addCartProduct, action.payload] }
    case "CANCEL_CART":
      const frame = [...state.addCartProduct]
      const reframe = frame.filter((item) => item.product_id !== action.payload.product_id)
      return { ...state, addCartProduct: reframe }
    case "ADD_WISHLIST":
      return { ...state, addWhishList: [...state.addWhishList, action.payload] }
    case "REMOVE_WISHLIST":
      const wishlistFrame = [...state.addWhishList]
      const wishReframe = wishlistFrame.filter((item) => item.product_id !== action.payload.product_id)
      return { ...state, addWhishList: wishReframe }
      case "ROUTE_UPDATE":
        return { ...state, currentRoute: action.payload }

    default:
      return state;
  }
};

export default Reducer;
