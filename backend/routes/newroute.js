const stripe = require('stripe')('sk_test_51N8NjkSDjoiiRk8VOxxe7C4FE9uj6PwiaH6i4YY61TAOI3SgKXdlqmFs2qGiaamIjbuZ9hyN2FZYuf1r9iVkh96U00G1nXUnr3');

async function createCheckoutSession(amount) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          unit_amount: amount, // The amount in cents or the smallest currency unit
          product_data: {
            name: 'Product Name',
            description: 'Product Description',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });
  
  return session;
}

// Prompt the user to enter the amount in dollars
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter the amount (in dollars): ', async (amountInDollars) => {
  readline.close();
  
  // Convert the amount to cents
  const amountInCents = parseFloat(amountInDollars) * 100;
  
  // Check if the conversion was successful
  if (isNaN(amountInCents)) {
    console.error('Invalid amount. Please enter a valid number.');
    return;
  }
  
  // Create the checkout session
  const checkoutSession = await createCheckoutSession(amountInCents);
  
  // Redirect the user to the checkout page
  console.log('Redirect URL:', checkoutSession.url);
});
