


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./AlertComponent.css"

const MySnackbar = ({ open, type,onClose,variant,message,duration }) => {
  return (
    <div className={`alert`} >
    <Snackbar
      open={open}
      autoHideDuration={duration ? duration :6000}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }} variant={variant? variant : "standard"}>
       {message}
      </Alert>
    </Snackbar>
    </div>
  );
};

export default MySnackbar;
