import React, {useState } from "react";
import axios from "axios";



const Payment = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the amount to the server
    try {
      const response = await axios.post('http://localhost:5000/stripe/create-checkout-session', {
        amount: amount
      });
      console.log(response.data.url);
      // Redirect to the Stripe checkout page
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Stripe Checkout</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount (in rupees):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Pay with Stripe</button>
      </form>
    </div>
  );
};




export default Payment;
