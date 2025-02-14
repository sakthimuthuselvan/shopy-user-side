import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./nav.css"
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material';
import SideBarList from "../SideBar/SidebarList";
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WindowWidth from '../Utilities';
import { useSelector } from 'react-redux';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoImg from "./logo.png"
import { useTheme } from '@emotion/react';
import LogInCom from "../SignIn/SingIn"
import lodash from "lodash"; // Import lodash

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
    categoryClick: false
  })
  const [openlogInDialog, setOpenlogInDialog] = useState(false)
const [searchVal,setSearchVal] = useState("")

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isClicked, sideBar, categoryClick } = state;

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
  }, [sideBar])


  const handleOutsideClick = (event) => {
    // Close sidebar if the clicked element is outside the sidebar
    if (!event.target.closest('.slide-layer')) {
      setState((pre) => {
        return {
          ...pre,
          sideBar: false
        }
      })
    }
  };

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    navigate("/wish-list")

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const size = WindowWidth()

  const sideBaropen = () => {
    setState((pre) => {
      return {
        ...pre,
        sideBar: true,
        categoryClick: false
      }
    })
  }

  const sidebarClose = () => {
    setState((pre) => {
      return {
        ...pre,
        sideBar: false
      }
    })
  }

  const categoryClickFun = () => {
    setState((pre) => {
      return {
        ...pre,
        categoryClick: !categoryClick
      }
    })
  }

  const addToCardBtnClick = () => {
    const token = !!localStorage.getItem("_Auth")
    if (token) {
      navigate("/add/to/card")
    } else {
      setOpenlogInDialog(true)
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
const onSearch=(val)=>{
  console.log("500 ",val);
  
}
  const handleSearchChange=(e)=>{
    setSearchVal(e.target.value)
    debouncedSearch(e.target.value); // Trigger debounce on input change

  }

  const searchValClear=()=>{
    setSearchVal("")
  }

  const token = !!localStorage.getItem("_Auth")
  return (// render()
    <div className='nav'>
      <div style={{ backgroundColor: primaryColor }} className={`${location.pathname === "/" ? "full-nav" : "full-nav-10"}  letter-primary`}>
        <div className='nav-content mx-3'>
          <div className='d-none d-md-block text-white pointer' onClick={() => homeBtnClick()}>
            {/* {size === "lg" && */}
           <img src={LogoImg} alt='logo' width={80} height={40} /> 
             {/* } */}
          </div>

          {location.pathname === "/" &&
            <div className='position-relative'>
              <div className={`searchbar letter-primary bg-btn-primary mt-1`}>
              <div className={`searchBox bg-btn-primary`}>
                <input 
                value={searchVal}
                onChange={(e)=> handleSearchChange(e)} className={`nav-search bg-btn-primary letter-primary fs-13`} placeholder='search product' />
              </div>
              <div>
              {searchVal.length > 0 && <HighlightOffIcon onClick={()=> searchValClear()} className={`icon pointer`} sx={{ fontSize: 15, marginRight: 0}} />}
              <IconButton> <SearchIcon className={`icon`} sx={{ fontSize: 25 }} /></IconButton>
              </div>
            </div>
           
           {searchVal.length > 2 && <div className='search-dropdown'>
              <div className='drop-suggestion'>ssakthi</div>
              <div className='drop-suggestion'>ssakthi</div>
              <div className='drop-suggestion'>ssakthi</div>
            </div>}
            </div>
            
            }

          <div className='box3'>
            {/* {size === "sm" || size === "md"  ? */}
              <div className='d-md-none'>
                <div className='d-flex align-items-center'>
                  {/* <IconButton onClick={sideBaropen}><MenuIcon sx={{ fontSize: 25 }} className='text-white pr-3' /></IconButton> */}
                  <h3 className='text-white pl-4 pt-2 ml-3' onClick={() => homeBtnClick()}>
                    <img src={LogoImg} alt='THE NATIVE ORGANIC' width={80} height={40} />

                  </h3>
                </div>
              </div>
              {/* : null} */}
            <div className='text-white'>
              <IconButton onClick={() => addToCardBtnClick()}>
                <Badge badgeContent={cartProducts.length} color="error">
                  <ShoppingCartOutlinedIcon className='text-white' sx={{ fontSize: 25 }} />
                </Badge>
              </IconButton>
              {/* <IconButton aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <div className='overall-heart'>
                  <FavoriteBorderIcon className='text-white' sx={{ fontSize: 25 }} />
                  {<div className='whishlist-dot bg-danger'></div>}
                </div>
              </IconButton> */}
              {!token ? <Button onClick={() => signInBtnClick()} className='ms-3 text-white border-white fw-bold' size='small' variant='outlined'>Login</Button> : 
              
              <Button onClick={() => signOutBtnClick()} className='ms-3 text-white border-white fw-bold' size='small' variant='outlined'>Logout</Button>}

            </div>
          </div>
        </div>
      </div>


      {openlogInDialog && loginDialogBuild()}
    </div>
  )
}

export default Index