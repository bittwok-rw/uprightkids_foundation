import paypal from '@paypal/checkout-server-sdk';

// Set up PayPal environment
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

// Create PayPal client
const client = new paypal.core.PayPalHttpClient(environment());

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create order request
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      
      // Format the amount correctly (convert to string with 2 decimal places)
      const amount = parseFloat(req.body.line_items[0].price_data.unit_amount / 100).toFixed(2);
      
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount
          },
          description: req.body.line_items[0].price_data.product_data.name
        }],
        application_context: {
          brand_name: 'Your Organization Name',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
          return_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/cancel`
        }
      });

      // Call PayPal to create the order
      const response = await client.execute(request);
      
      // Find the approval URL
      const approvalUrl = response.result.links.find(link => link.rel === 'approve').href;
      
      // Return the order ID and approval URL
      res.status(200).json({ 
        id: response.result.id,
        approvalUrl 
      });
    } catch (error) {
      console.error('PayPal error:', error);
      res.status(500).json({ error: error.message || 'PayPal integration error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}