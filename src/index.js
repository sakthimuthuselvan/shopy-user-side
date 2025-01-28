import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { green, purple } from "@mui/material/colors";
import HttpRequest from "./Utilities/ApiCall/HttpRequest";
import Loader from "./Utilities/Loader/Loader";
import MySnackbar from "./AlertShow/Alert";

const Root = () => {
  const [siteData, setSiteData] = useState({});
  const [formVal, setFormVal] = useState({
    openSnakbar: false,
    openSnakbarType: "",
    openSnakbarMsg: "",
  });

  // UseEffect to call formSubmitApiCall when the component mounts
  useEffect(() => {
    formSubmitApiCall();
  }, []);

  const formSubmitApiCall = () => {
    const method = "GET";
    const url = "site-setting-api/get";
    const data = {};
    axiosApiCallFun(method, url, data, "getSiteSettingDatas");
  };

  const axiosApiCallFun = async (method, url, data, type) => {
    try {
      const response = await HttpRequest({ method, url, data });
      switch (type) {
        case "getSiteSettingDatas":
          getSiteSettingDatasRes(response);
          break;
        default:
          break;
      }
    } catch (error) {
      setFormVal((prev) => ({
        ...prev,
        openSnakbar: true,
        openSnakbarType: "error",
        openSnakbarMsg: error.response_message
          ? error.response_message
          : "Something went wrong",
      }));
    }
  };

  const getSiteSettingDatasRes = (response) => {
    const data = response.response_data ? response.response_data : {};
    // Handle the response here
    setSiteData(data);
  };

  // Define your Material-UI theme
  const theme = createTheme({
    palette: {
      primary: {
        main: siteData.primary ? siteData.primary : "#1976d2", // Customize your primary color
      },
      secondary: {
        main: siteData.secondary ? siteData.secondary : "#19857b", // Customize your secondary color
      },
      error: {
        main: "#ff1744", // Customize your error color
      },
      background: {
        default: "#f5f5f5", // Customize your background color
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif", // Customize your font family
    },
  });

  const changeFavicon = (url) => {
    let link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = url;
    document.head.appendChild(link);
  };
  return (
    <>
      {/* Snackbar component to show error or success messages */}
      <MySnackbar
        open={formVal.openSnakbar}
        type={formVal.openSnakbarType}
        variant="filled"
        message={formVal.openSnakbarMsg}
        duration={3000}
        handleClose={() =>
          setFormVal((prev) => ({ ...prev, openSnakbar: false }))
        }
      />

      {siteData &&
        Object.keys(siteData).length > 0 &&
        changeFavicon(siteData.fav_icon)}
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Root />);
