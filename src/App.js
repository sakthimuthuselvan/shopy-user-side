import React, { Suspense } from 'react';
import "./App.css";
import "./custom.scss";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from "./NavBar/Index";
import RouteList from "./Routes/index";
import Loader from '../src/Utilities/Loader/Loader';
import { useSelector } from 'react-redux';
import { useCurrentRoute } from './Utilities/PathFind'; // Adjust the path as necessary
import { useTheme } from '@emotion/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { lightenColor } from './Utilities/Util';
function AppContent() {
  const currentRoute = useCurrentRoute();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;  // Get the primary color
  const light_Primary = lightenColor(primaryColor, 0.1)
  const cartProducts = useSelector(state => state.cart.cartProducts)
  const navigate = useNavigate()



  const bottomBtnCLick = () => {
    navigate("/add/to/card")
  }

  return (
    <div style={{ overflow: "hidden", marginTop: currentRoute !== "/" ? 90 : 90 }} className={`${currentRoute !== "/" ? "sm-margin-another-page" : 'sm-margin-top'} position-relative`}>
      <Routes>
        {
          RouteList.map(({ path, component: Component }, index) => {
            return (
              <Route key={index} path={path} element={<Suspense fallback={<Loader open={true} />}><Component /></Suspense>} />
            )
          })
        }
      </Routes>

      {currentRoute !== "/add/to/card" && currentRoute !== "/delivery/details" && cartProducts.length > 0 && <div style={{ bottom: 10, }} className='d-md-none position-fixed  w-100'>
        <div onClick={() => bottomBtnCLick()} style={{ backgroundColor: primaryColor }} className='rounded p-2 mb-2 mx-3 text-white fs-12' >
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
              <div style={{ backgroundColor: light_Primary, borderRadius: 40 }} className='pointer p-2 rounded me-2'>
                <ShoppingCartIcon />
              </div>
              <div>
                <div className='fw-bold'>{cartProducts.length} items</div>
                {/* <div>{currency} {totalPriceGetFun()}</div> */}
              </div>
            </div>
            <div className='fw-bold fs-16'>
              View Cart <ChevronRightIcon className='ml-1' />
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
