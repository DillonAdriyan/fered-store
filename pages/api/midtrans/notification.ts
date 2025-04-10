import type { NextApiRequest, NextApiResponse } from 'next';
import midtransClient from 'midtrans-client';

// Konfigurasi Midtrans
const snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === 'production',
  serverKey: process.env.MIDTRANS_SERVER_KEY as string,
  clientKey: process.env.MIDTRANS_CLIENT_KEY as string
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const notification = await snap.transaction.notification(req.body);
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

    // Proses status transaksi (misalnya update status di database)
    if (transactionStatus === 'capture') {
      if (fraudStatus === 'challenge') {
        // TODO: set transaction status to 'challenge' in your database
        console.log(`Transaction ${orderId} is challenged`);
      } else if (fraudStatus === 'accept') {
        // TODO: set transaction status to 'success' in your database
        console.log(`Transaction ${orderId} is successful`);
      }
    } else if (transactionStatus === 'settlement') {
      // TODO: set transaction status to 'success' in your database
      console.log(`Transaction ${orderId} has been settled`);
    } else if (transactionStatus === 'cancel' || transactionStatus === 'deny' || transactionStatus === 'expire') {
      // TODO: set transaction status to 'failure' in your database
      console.log(`Transaction ${orderId} is failed`);
    } else if (transactionStatus === 'pending') {
      // TODO: set transaction status to 'pending' in your database
      console.log(`Transaction ${orderId} is pending`);
    }

    // Kirim response OK ke Midtrans
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.error('Error processing notification:', error);
    res.status(500).json({ 
      status: 'ERROR', 
      message: error.message 
    });
  }
}