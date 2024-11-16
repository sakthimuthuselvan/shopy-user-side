import React, { Suspense } from 'react';
import "./App.css";
import "./custom.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "./NavBar/Index";
import RouteList from "./Routes/index";
import Loader from '../src/Utilities/Loader/Loader';
import { useSelector } from 'react-redux';
import { useCurrentRoute } from './Utilities/PathFind'; // Adjust the path as necessary

function AppContent() {
  const currentRoute = useCurrentRoute();
  console.log("sadddddddd============= ", currentRoute);

  return (
    <div style={{ overflow: "hidden", marginTop: currentRoute !== "/" ? 90 : 130 }} className='sm-margin-top'>
      <Routes>
        {
          RouteList.map(({ path, component: Component }, index) => {
            return (
              <Route key={index} path={path} element={<Suspense fallback={<Loader open={true} />}><Component /></Suspense>} />
            )
          })
        }
      </Routes>
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
