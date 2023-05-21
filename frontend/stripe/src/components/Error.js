import { Box, Button, Card } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/')
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
      <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '500px', padding: '10px' }}>
        <Card sx={{
          borderRadius: '50%', width: '50px', height: '50px', alignItems: 'center', display: ' flex', justifyContent: 'center',
          margin: '10px'
        }}>
          <ClearIcon color='error' />
        </Card>
        <Box sx={{ fontWeight: 'bold', margin: '10px', color: 'red', fontSize: '2rem' }}>Cancel!!!</Box>
        <Box>OOPS! Want To Go Back .Please Press Below Button</Box>
        <Button sx={{ margin: '10px', marginTop: '15px' }} variant='outlined' color='error' onClick={handleClick}>Back To Home</Button>
      </Card>
    </Box>
  )
}

export default Error