import { Box, Button, Card } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

const Success = () => {

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
          <CheckIcon color='success' />
        </Card>
        <Box sx={{ fontWeight: 'bold', margin: '10px', color: 'green', fontSize: '2rem' }}>Success!!!</Box>
        <Box>Your Transaction is Successfully Completed!</Box>
        <Button sx={{ margin: '10px', marginTop: '15px' }} variant='outlined' color='success' onClick={handleClick}>Back To Home</Button>
      </Card>
    </Box>

  )
}

export default Success