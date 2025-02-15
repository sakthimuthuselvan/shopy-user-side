import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const HttpRequest = async ({ method, url, data }) => {
  
  try {
    const token = localStorage.getItem('Auth');
    const response = await axios({
      method: method,
      url: `https://0p055xm8-4000.inc1.devtunnels.ms/${url}`, // Assuming you want to use the base URL
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Handle successful response here
    return response.data;
  } catch (error) {
    // Handle error here
    throw error.response.data;
  }
};

export default HttpRequest;

