import React, { useCallback, useEffect, useState } from 'react'
import "./nav.css"
import { Badge, Button, IconButton } from '@mui/material';
import SideBarList from "../SideBar/SidebarList";
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoImg from "./logo.png"
import { useTheme } from '@emotion/react';
import LogInCom from "../SignIn/SingIn"
import lodash from "lodash"; // Import lodash
import HttpRequest from '../Utilities/ApiCall/HttpRequest';
import { removeUserData } from '../Utilities/Util';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme();  // Access the current theme
  const primaryColor = theme.palette.primary.main;  // Get the primary color
  const cartProducts = useSelector((state) => state.cart.cartProducts)
  // const [companyName] = useState("Shopy")
  const [state, setState] = useState({
    isClicked: false,
    SideBarList: SideBarList,
    sideBar: false,
    categoryClick: false,
    openSnakbar: false,
    openSnakbarType: "",
    openSnakbarMsg: ""
  })
  const [openlogInDialog, setOpenlogInDialog] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const [categoryList, setCategoryList] = useState([])
  const [productList, setProductList] = useState([])

  const { sideBar } = state;

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
  }, [sideBar])

  const axiosApiCallFun = async (method, url, data, type) => {
    try {
      const response = await HttpRequest({ method, url, data });
      switch (type) {
        case "searchApiCallReq":
          searchResFun(response);
          break;
        default:
          break;
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        openSnakbar: true,
        openSnakbarType: "error",
        openSnakbarMsg: error.response_message
          ? error.response_message
          : "Something went wrong",
      }));
    }
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.slide-layer')) {
      setState((pre) => {
        return {
          ...pre,
          sideBar: false
        }
      })
    }
  };

  const addToCardBtnClick = () => {
    const token = !!localStorage.getItem("_Auth")
    if (token) {
      navigate("/add/to/card")
      setSearchVal("")
    } else {
      setOpenlogInDialog(true)
      setSearchVal("")
    }
  }

  const homeBtnClick = () => {
    navigate("/")
  }

  const signInBtnClick = () => {
    setOpenlogInDialog(true)

  }
  const signOutBtnClick = () => {
    try {
      localStorage.removeItem("_Auth");
      removeUserData()
      window.location.reload(); // Corrected reload method
    } catch (err) {
      console.error("Error during sign out:", err); // Logs error if something fails
    }
  };


  const loginDialogBuild = () => {
    return (
      <div>
        <LogInCom loginPageCallBack={callbackFun} />
      </div>)
  }

  const callbackFun = () => {
    setOpenlogInDialog(false)
  }

  const debouncedSearch = useCallback(
    lodash.debounce((searchQuery) => {
      onSearch(searchQuery);
    }, 500),
    []
  );
  const onSearch = (val) => {
    const method = "GET";
    const url = `search-product?query=${val}`;
    const data = {};
    axiosApiCallFun(method, url, data, "searchApiCallReq");
  }

  const searchResFun = (response) => {
    console.log("response ", response);
    const { categories, products } = response;
    setCategoryList(categories)
    setProductList(products)

  }

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value)
    debouncedSearch(e.target.value); // Trigger debounce on input change


  }

  const searchValClear = () => {
    setSearchVal("")
    setCategoryList([])
    setProductList([])
  }

  const categorySearchValClick = (data) => {
    navigate(`categoty/${data._id}`)
    setSearchVal("")
  }

  const productDataClick = (data) => {
    navigate("search/products", {
      state: data
    })
    setSearchVal("")

  }
  const token = !!localStorage.getItem("_Auth")
  console.log("location.pathname ", location.pathname);


  return (// render()
    <div className={location.pathname === "/" ? 'nav' : "nav-another-route"}>
      <div style={{ backgroundColor: primaryColor }} className={`${location.pathname === "/" ? "full-nav" : "full-nav-another-route"} letter-primary`}>

        <div className='nav-content mx-3'>
          <div className='d-none d-md-block text-white pointer' onClick={() => homeBtnClick()}>
            <img src={LogoImg} alt='logo' width={80} height={40} />
          </div>

          {location.pathname === "/" &&
            <div className='position-relative'>
              <div className={`searchbar letter-primary bg-btn-primary mt-1`}>
                <div className={`searchBox bg-btn-primary`}>
                  <input
                    value={searchVal}
                    onChange={(e) => handleSearchChange(e)} className={`nav-search bg-btn-primary letter-primary fs-13`} placeholder='search product' />
                </div>
                <div>
                  {searchVal.length > 0 && <HighlightOffIcon onClick={() => searchValClear()} className={`icon pointer`} sx={{ fontSize: 15, marginRight: 0 }} />}
                  <IconButton> <SearchIcon className={`icon`} sx={{ fontSize: 25 }} /></IconButton>
                </div>
              </div>

              {searchVal.length > 2 && <div className='search-dropdown'>
                {categoryList.map((item) => {
                  return (
                    <div onClick={() => categorySearchValClick(item)} className='drop-suggestion'>{item.name} <small className='text-gray'>Category</small></div>
                  )
                })}
                {productList.map((item) => {
                  return (
                    <div onClick={() => productDataClick(item)} className='drop-suggestion'>{item.product_name} </div>
                  )
                })}
                {categoryList.length === 0 && productList.length === 0 ? <div className='no-data-found'>No Products Match </div> : null}
              </div>}
            </div>

          }

          <div className='box3'>
            <div className='d-md-none'>
              <div className='d-flex align-items-center'>
                <h3 className='text-white pl-4 pt-2 ml-3' onClick={() => homeBtnClick()}>
                  <img src={LogoImg} alt='THE NATIVE ORGANIC' width={80} height={40} />

                </h3>
              </div>
            </div>
            <div className='text-white'>

              <IconButton onClick={() => cartProducts.length > 0 ? addToCardBtnClick() : null}>
                <Badge badgeContent={cartProducts.length} color="error">
                  <ShoppingCartOutlinedIcon className='text-white' sx={{ fontSize: 25 }} />
                </Badge>
              </IconButton>

              {!token ? <Button onClick={() => signInBtnClick()} className='ms-3 text-white border-white fw-bold' size='small' variant='outlined'>Login</Button> :

              <>
              
                <IconButton>
                  <ShoppingBagIcon className='text-white' />
                </IconButton>
                <IconButton onClick={() => signOutBtnClick()}>
                  <LogoutOutlinedIcon className='text-white' />
                </IconButton>
                </>
                // <Button onClick={() => signOutBtnClick()} className='ms-3 text-white border-white fw-bold' size='small' variant='outlined'>Logout</Button>

              }
            </div>
          </div>


        </div>
      </div>


      {openlogInDialog && loginDialogBuild()}
    </div>
  )
}

export default Index