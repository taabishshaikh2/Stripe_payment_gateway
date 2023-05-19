const router = require("express").Router();

const stripe = require("stripe")('sk_test_51N8NjkSDjoiiRk8VOxxe7C4FE9uj6PwiaH6i4YY61TAOI3SgKXdlqmFs2qGiaamIjbuZ9hyN2FZYuf1r9iVkh96U00G1nXUnr3');
// const stripe = require("stripe")('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');


// creating a source
// router.post("/source", async(req,res) => {
//     try{
        
//         const source = await stripe.sources.create({
//             type: 'ach_credit_transfer',
//             currency: 'usd',
//             owner: {
//               email: 'Reyna@valorant.com'
//             }
//     })
//     res.status(200).json(source)
//  }
//  catch(err){
//     res.status(500).json(err)
// }
//  })

// publishable key
router.get("/secret" , async(req,res) => {
    res.status(200).json({
        publishableKey : process.env.STRIPE_PUBLISHABLE_KEY
    })
})

// adding card to a customer
router.post("/attachcard", async(req,res) => {
    try{
        const card = await stripe.customers.createSource(
            'cus_NuDOgtSbx3CTFm',
            {
                source: 'tok_visa',
            dynamic_last4: '9876',
            }
          )
          res.status(200).json(card)
    } catch(err){
        res.status(500).json(err)
    }
})

// creating a checkout session

router.post('/create-checkout-session', async (req, res) => {
    const { amount } = req.body;
  
    // Convert the amount to cents
    const amountInCents = parseFloat(amount) * 100;
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              unit_amount: amountInCents,
              product_data: {
                name: 'Product Name',
                description: 'Product Description',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/error',
      });
  
      res.json({ url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while creating the checkout session.');
    }
  });

// creating a payment intent
router.post("/payment", async (req, res) => {

  
    try{
        // const options = {
          
            
        //   };
        //   const order = await stripe.charges.create({
        //     // source: req.body.tokenId,
        //     amount: '5000',
        //     currency: "inr",
        //     customer: 'cus_NuDOgtSbx3CTFm',
        //     // source: 'tok_visa'
            
        //   });
        //   console.log(order)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2000,
            currency: 'inr',
            customer: 'cus_NuDOgtSbx3CTFm',
            payment_method_types: ['card'],
            // automatic_payment_methods: {enabled: true},
          });
          res.status(200).json({paymentIntent: paymentIntent.client_secret})
    }
    catch(err){
        res.status(500).json(err)
    }

})
module.exports = router;

// creating a payment recieved

router.post("/paymentrecieved", async(req, res) => {
    try{
        // const paymentIntent = await stripe.paymentIntents.capture(
        //     'pi_3N8PdrSDjoiiRk8V1nl0KsML'
        //   );
        const paymentIntent = await stripe.paymentIntents.confirm(
            'pi_3N8PdrSDjoiiRk8V1nl0KsML',
            {payment_method: 'pm_card_visa'}
          );
          res.status(200).json(paymentIntent)
    }
    catch(err){
        res.status(500).json(err)
    }
})
// captuing payment
router.post("/paymentcaptured", async(req, res) => {
    try{
        const paymentIntent = await stripe.paymentIntents.capture(
            'pi_3N8PdrSDjoiiRk8V1nl0KsML'
          );
       
          res.status(200).json(paymentIntent)
    }
    catch(err){
        res.status(500).json(err)
    }
})

