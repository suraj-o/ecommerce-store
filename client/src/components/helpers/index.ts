export const options = {
    key: 'YOUR_KEY_ID', // Replace with your Razorpay key_id
    amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Acme Corp',
    description: 'Test Transaction',
    order_id: 'order_IluGWxBm9U8zJ8', // This is the order_id created in the backend
    callback_url: 'http://localhost:3000/payment-success', // Your success URL
    prefill: {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      contact: '9999999999'
    },
    theme: {
      color: '#F37254'
    },
  };
