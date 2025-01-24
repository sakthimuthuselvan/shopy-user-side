import React, { useEffect, useRef, useState } from 'react'
import "./nav.css"
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material';
import SideBarList from "../SideBar/SidebarList";
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WindowWidth from '../Utilities';
import { useSelector, useDispatch } from 'react-redux';
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

function Index() {
  const sidebarRef = useRef();
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme();  // Access the current theme
  const primaryColor = theme.palette.primary.main;  // Get the primary color

  // const [companyName] = useState("Shopy")
  const [state, setState] = useState({
    isClicked: false,
    SideBarList: SideBarList,
    sideBar: false,
    categoryClick: false
  })
  const [locationGetDialog, setLocationGetDialog] = useState(false)
const [openlogInDialog, setOpenlogInDialog] = useState(false)


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isClicked, sideBar, categoryClick } = state;


  const globalState = useSelector((state) => state);
  const dispatch = useDispatch()

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
    dispatch({ type: "ROUTE_UPDATE", payload: `/wish-list` })

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const size = WindowWidth()

  const closeBtnClick = () => {
    localStorage.setItem("_theme", isClicked)
    setState({
      ...state,
      isClicked: !isClicked
    })
  }
  const loginBtnClick = () => {
    setAnchorEl(null);
    dispatch({ type: "open_dialog", payload: true })
  }

  const logoutBtnClick = () => {
    localStorage.removeItem("_Auth")
    window.location.reload();
  }

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
    navigate("/add/to/card")
    dispatch({ type: "ROUTE_UPDATE", payload: `/add/to/card` })

  }

  const homeBtnClick = () => {
    navigate("/")
    dispatch({ type: "ROUTE_UPDATE", payload: `/` })
  }

  const signInBtnClick=()=>{
    setOpenlogInDialog(true)
    console.log("ssssssssss")
    // dispatch({ type: "open_dialog", payload: true })

  }

  const loginDialogBuild = () => {
    return(
      <LogInCom />   
    //   <Dialog
    //   open={openlogInDialog}
    //   fullWidth
    //   // onClose={()=> setOpenlogInDialog(false)}
    // >
    //   <DialogTitle>Subscribe</DialogTitle>
    //   <DialogContent>
   
    //   </DialogContent>
    //   <DialogActions>
    //     </DialogActions>
    //     </Dialog>
    )
  }
  const token = !!localStorage.getItem("_Auth")
  return (// render()
    <div className='nav'>
      <div style={{ backgroundColor: primaryColor }} className={`${location.pathname === "/" ? "full-nav" : "full-nav-10"}  letter-primary`}>
        <div className='nav-content mx-3'>
          <div className='text-white pointer' onClick={() => homeBtnClick()}>
            {size !== "sm" && <img src={LogoImg} alt='logo' width={80} height={40} />}
          </div>

          {location.pathname === "/" &&
            <div className={`searchbar letter-primary bg-btn-primary mt-1`}>
              <div className={`searchBox bg-btn-primary`}>
                <input className={`nav-search bg-btn-primary letter-primary`} placeholder='search product' />
              </div>
              <HighlightOffIcon className={`icon pointer`} sx={{ fontSize: 15, marginRight: 2 }} />
              <IconButton> <SearchIcon className={`icon`} sx={{ fontSize: 25 }} /></IconButton>
            </div>}

          <div className='box3'>
            {size === "sm" ?
              <div>
                <div className='d-flex align-items-center'>
                  <IconButton onClick={sideBaropen}><MenuIcon sx={{ fontSize: 25 }} className='text-white pr-3' /></IconButton>
                  <h3 className='text-white pl-4 pt-2' onClick={() => homeBtnClick()}>
                    <img src={LogoImg} alt='THE NATIVE ORGANIC' width={80} height={40} />

                  </h3>
                </div>
                <div className={`${sideBar ? "sakthi" : ""}`}>
                  <div className={`slide-layer ${sideBar ? "sidebar-open" : ""}`}>
                    <IconButton onClick={sidebarClose}><CloseIcon style={{ fontSize: "2rem" }} /></IconButton>
                    <div className='pl-2 pt-2'>
                      <h6 className='item pointer' onClick={categoryClickFun}>category {categoryClick ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</h6>
                      {categoryClick ?
                        <div style={{ marginLeft: 30 }}>
                          <h6 className='drop-down pointer'>sakthi</h6>
                          <h6 className='drop-down pointer'>sakthi</h6>
                          <h6 className=' drop-down pointer'>sakthi</h6>
                          <h6 className='drop-down pointer'>sakthi</h6>
                        </div> : null}
                      <h6 className='item pointer'>Whish List</h6>
                      <h6 className='item pointer'>Logout</h6>
                    </div>
                  </div>
                </div>
              </div>
              : null}
            <div className='text-white'>
              <IconButton onClick={() => addToCardBtnClick()}>
                <Badge badgeContent={globalState.addCartProduct.length} color="error">
                  <ShoppingCartOutlinedIcon className='text-white' sx={{ fontSize: 25 }} />
                </Badge>
              </IconButton>
              <IconButton aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <div className='overall-heart'>
                  <FavoriteBorderIcon className='text-white' sx={{ fontSize: 25 }} />
                  {globalState.addWhishList.length > 0 ? <div className='whishlist-dot bg-danger'></div> : null}
                </div>
              </IconButton>
              <Button onClick={()=> signInBtnClick()} className='ms-3 text-white border-white fw-bold' size='small' variant='outlined'>Login</Button>

            </div>
          </div>
        </div>
      </div>


                        {openlogInDialog && loginDialogBuild()}
    </div>
  )
}

export default Index