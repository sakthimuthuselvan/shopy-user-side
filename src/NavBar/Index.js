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
function Index() {
  const sidebarRef = useRef();
  const navigate = useNavigate()
  const location = useLocation()

    const [companyName] = useState("Shopy")
  const [state, setState] = useState({
    isClicked: false,
    SideBarList: SideBarList,
    sideBar: false,
    categoryClick:false
  })
  const [locationGetDialog,setLocationGetDialog] = useState(false)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isClicked, sideBar,categoryClick } = state;


  const globalState = useSelector((state) => state);
  const dispatch = useDispatch()


// const handleGrantPermission = () => {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log(latitude);
//       console.log(longitude);
//       setLocationGetDialog(false);
//       alert("success")
//       // Handle permission granted
//     },
//     () => {
//       setLocationGetDialog(true);
//       alert("please enter manually")
//       // Handle permission denied or error
//     }
//   );
// };

const handleGrantPermission = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      // setLocationData(data);
      setLocationGetDialog(false)
      console.log(data);
      alert("success")
    } else {
      console.error('Failed to fetch location data:', response.statusText);
      alert("faliure")
    }
  } catch (error) {
    console.error('Error fetching location data:', error);
  }
};
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
        categoryClick:false
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

  const categoryClickFun=()=>{
    setState((pre)=>{
      return{
        ...pre,
        categoryClick: !categoryClick
      }
    })
  }

  const addToCardBtnClick=()=>{
    navigate("/add/to/card")
    dispatch({ type: "ROUTE_UPDATE", payload: `/add/to/card` })

  }

  const homeBtnClick=()=>{
    navigate("/")
    dispatch({ type: "ROUTE_UPDATE", payload: `/` })
  }
  const token = !!localStorage.getItem("_Auth")
  return (
    <div className='nav'>
      <div className={`${location.pathname === "/" ?"full-nav" :"full-nav-10" }  bg-primary letter-primary`}>
        <div className='nav-content mx-3'>
          <div className='text-white pointer' onClick={()=> homeBtnClick()}>
          {size !== "sm" && <img src={LogoImg} alt='logo' width={80} height={40}/>}
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
                  <h3 className='text-white pl-4 pt-2' onClick={()=> homeBtnClick()}>
                    <img src={LogoImg} alt='THE NATIVE ORGANIC'width={80} height={40} />
                  
                  </h3>
                </div>
                <div className={`${sideBar ? "sakthi" : ""}`}>
                  <div className={`slide-layer ${sideBar ? "sidebar-open" : ""}`}>
                    <IconButton onClick={sidebarClose}><CloseIcon style={{ fontSize: "2rem" }} /></IconButton>
                    <div className='pl-2 pt-2'>
                    <h6 className='item pointer' onClick={categoryClickFun}>category {categoryClick ? <KeyboardArrowUpIcon /> :<KeyboardArrowDownIcon />}</h6>
                      {categoryClick ?
                      <div style={{marginLeft:30}}>
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
                      {globalState.addWhishList.length > 0 ?  <div className='whishlist-dot bg-danger'></div> : null} 
                </div>
                </IconButton>
            </div>
          </div>
        </div>
      </div>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {token ?
          <MenuItem onClick={logoutBtnClick}><Logout className='mr-1 text-info' />  Logout</MenuItem>
          :
          <MenuItem onClick={loginBtnClick}><Login className='mr-1 text-info' />  Login</MenuItem>
        }
      </Menu>

      <Dialog open={locationGetDialog}>
      <DialogTitle className='font-weight-bold'>Location Access</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This application requires access to your location for delivery services. 
          Please grant permission to enable location services.
        </DialogContentText>
      </DialogContent>
      <DialogActions className='py-3'>
      <Button onClick={handleGrantPermission} 
      variant='contained'
      size='small'
      className='bg-secondary text-black'>
          Manually Type
        </Button>
        <Button onClick={handleGrantPermission}
         size='small'
        variant='outlined' className="bg-success text-white" color="secondary">
          Grant Permission
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default Index