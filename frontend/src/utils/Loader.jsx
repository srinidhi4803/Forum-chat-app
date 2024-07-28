import React from 'react'
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
function Loader() {
  return (
    <Box sx={{ position: 'relative', display: 'flex',  alignItems:'center',justifyContent:'center',minHeight:'100vh' }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;