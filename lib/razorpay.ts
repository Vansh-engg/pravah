import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function createOrder(amount: number, currency: string = 'INR') {
  const options = {
    amount: amount * 100, // Amount in paise/cents
    currency,
    receipt: `receipt_${Math.random().toString(36).substring(7)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Razorpay Order Creation Failed:', error);
    throw error;
  }
}
