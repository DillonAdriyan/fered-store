import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
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
    const { 
      product, 
      productType, 
      topupOption, 
      paymentMethod, 
      userId, 
      customerName, 
      customerEmail 
    } = req.body;

    // Buat Order ID unik
    const orderId = `ORDER-${uuidv4()}`;
    
    // Parameter untuk Midtrans
    const transactionParam = {
      transaction_details: {
        order_id: orderId,
        gross_amount: topupOption.price + 2000 // Harga produk + biaya admin
      },
      item_details: [
        {
          id: product.id.toString(),
          name: `${product.name} - ${topupOption.name}`,
          price: topupOption.price,
          quantity: 1
        },
        {
          id: 'admin-fee',
          name: 'Biaya Admin',
          price: 2000,
          quantity: 1
        }
      ],
      customer_details: {
        first_name: customerName || 'Customer',
        email: customerEmail || 'customer@example.com',
        phone: productType === 'pulsa' || productType === 'data' ? userId : undefined
      },
      custom_field1: userId, // Menyimpan user ID atau nomor telepon
      custom_field2: productType, // Menyimpan tipe produk
      custom_field3: paymentMethod.type // Menyimpan tipe metode pembayaran
    };

    // Buat token transaksi
    const transaction = await snap.createTransaction(transactionParam);
    
    // Kirim token ke frontend
    res.status(200).json({
      success: true,
      token: transaction.token,
      redirect_url: transaction.redirect_url
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
      error: error.message
    });
  }
}