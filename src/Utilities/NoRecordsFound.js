import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

const NoRecordsFound = ({ message = 'No records found' }) => {
  return (
    <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  className="text-center py-5"
>
  <img
    src={require("./no_record.jpg")}
    alt="No data"
    style={{ width: '250px', marginBottom: '1rem' }}
    className='rounded'
  />

  <Typography
    variant="h6" // Bigger than h5
    style={{
      color: 'rgb(97 96 96 / 87%)',          // Black color
    fontWeight: 800,
    fontFamily: 'Poppins, sans-serif', // Example font
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    }}
  >
    {message}
  </Typography>
</motion.div>

  );
};

export default NoRecordsFound;
