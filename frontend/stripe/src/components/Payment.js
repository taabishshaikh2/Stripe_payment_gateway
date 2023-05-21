import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, Divider, Paper } from '@mui/material'
import { toast } from "react-toastify";

const Payment = () => {
  const [amount, setAmount] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAmount('')
    toast.success(`Redirecting to payment`)
    // Send the amount to the server
    try {
      const response = await axios.post('http://localhost:5000/stripe/create-checkout-session', {
        amount: amount
      });
      // Redirect to the Stripe checkout page
      window.location.href = response.data.url;
    } catch (error) {
      toast.error(error)
    }
  };
  return (
    <Box marginTop={'50px'} sx={{
      display: 'flex', alignItems: 'center', justifyItems: 'center'
      , textAlign: 'center'
    }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ textAlign: 'center', width: '600px', border: '1px solid black' }}>
          <Box><h1>Payment Checkout</h1></Box>
          <Divider />
          <form onSubmit={handleSubmit} >
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
              <label htmlFor="amount">Amount (₹):</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{ padding: '12px 20px', marginTop: '10px' }}
                step={0.01}

              />
            </Box>
            <Button type="submit" size="small" variant="contained" sx={{ margin: '10px', fontFamily: 'Nunito' }} style={{ background: 'black' }}>Pay with Stripe</Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};




export default Payment;
