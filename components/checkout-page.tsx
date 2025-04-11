
// Tambahkan import berikut
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ChevronDown } from 'lucide-react'
// Di dalam file checkout-page.tsx

// Tambahkan interface untuk response dari backend
interface TransactionResponse {
  success: boolean;
  token: string;
  redirect_url: string;
}

// Tambahkan tipe untuk Midtrans Snap
declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: {
        onSuccess: (result: any) => void;
        onPending: (result: any) => void;
        onError: (result: any) => void;
        onClose: () => void;
      }) => void;
    };
  }
}

export default function CheckoutPage({
  product,
  productType,
  topupOption,
  paymentMethod,
  userId,
  onBack,
}: CheckoutPageProps) {
  // State existings tetap sama
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<string | null>(
    paymentMethod.options && paymentMethod.options.length > 0 ? paymentMethod.options[0].id : null,
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Tambahkan state untuk customer info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Load Midtrans Snap script
  useEffect(() => {
    // Cek apakah script sudah dimuat
    if (!document.getElementById("midtrans-script")) {
      const script = document.createElement("script");
      script.id = "midtrans-script";
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "MIDTRANS_CLIENT_KEY");
      script.async = true;

      document.body.appendChild(script);
    }

    return () => {
      // Cleanup jika diperlukan
      const script = document.getElementById("midtrans-script");
      if (script) {
        // script.remove(); // Uncomment jika ingin remove script saat unmount
      }
    };
  }, []);

  // Fungsi format price tetap sama
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }, []);

  // Update fungsi handlePayment untuk menggunakan Midtrans
  // Update fungsi handlePayment untuk menggunakan API Routes
  const handlePayment = useCallback(async () => {
  try {
    setIsProcessing(true);

    // Data untuk transaksi dan dikirim ke backend Midtrans, dll.
    const paymentData = {
      product,
      productType,
      topupOption,
      paymentMethod,
      userId,
      customerName,
      customerEmail,
    };

    // Panggil API Route untuk membuat transaksi Midtrans
    const response = await fetch("/api/midtrans/create-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    const data: TransactionResponse = await response.json();

    if (data.success && data.token) {
      // Jalankan Midtrans Snap dengan token
      window.snap?.pay(data.token, {
        onSuccess: async (result) => {
          console.log("Payment success:", result);
          alert("Pembayaran berhasil!");

          // Panggil API untuk mengirim pesan WhatsApp
          await fetch("/api/send-whatsapp-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: customerName,
              email: customerEmail,
              gameId: product.id, // Pastikan product.id sesuai dengan data game
              zoneId: product.id === "mobile-legends" ? userIdZone /* misalnya zone id tersimpan di sini */ : "",
              productName: product.name,
            }),
          });

          // Simpan histori pesanan jika diperlukan, dsb.
          onBack();
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
          alert("Pembayaran dalam proses. Silakan cek status pembayaran Anda.");
        },
        onError: (result) => {
          console.error("Payment error:", result);
          alert("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          console.log("Customer closed the popup without finishing the payment");
          setIsProcessing(false);
        },
      });
    } else {
      throw new Error(data.message || "Failed to create transaction");
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    alert("Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.");
    setIsProcessing(false);
  }
}, [product, productType, topupOption, paymentMethod, userId, customerName, customerEmail, onBack]);


  // Get the appropriate icon based on product type
  const getProductIcon = useCallback(() => {

    switch (productType) {
      case "game":
        return <GameController className="h-6 w-6 text-white" />
      case "ewallet":
        return <Wallet className="h-6 w-6 text-white" />
      case "data":
        return <Wifi className="h-6 w-6 text-white" />
      case "pulsa":
        return <Smartphone className="h-6 w-6 text-white" />
      default:
        return <GameController className="h-6 w-6 text-white" />
    }
  }, [productType])

  // Get the appropriate label based on product type
  const getUserIdLabel = useCallback(() => {

    switch (productType) {
      case "game":
        return "User ID"
      case "ewallet":
      case "data":
      case "pulsa":
        return "Phone Number"
      default:
        return "User ID"
    }
  }, [productType])

  // Get the appropriate title based on product type
  const getTitle = useCallback(() => {
    switch (productType) {
      case "game":
        return "Game Top-Up"
      case "ewallet":
        return "E-Wallet Top-Up"
      case "data":
        return "Data Package"
      case "pulsa":
        return "Pulsa Top-Up"
      default:
        return "Top-Up"
    }
  }, [productType])


  

  // Tambahkan form untuk data customer di bagian Order Details
  return (
    <div className="container px-4 py-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronDown className="mr-2 h-4 w-4 rotate-90" />
        Back to {getTitle()}
      </Button>

      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border bg-card p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                {/* Informasi produk seperti sebelumnya */}
                {product.image ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div
                    className={`h-16 w-16 rounded-lg ${product.color || "bg-primary"} flex items-center justify-center`}
                  >
                    {getProductIcon()}
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{topupOption.name}</p>
                  <p className="text-sm">
                    {getUserIdLabel()}: {userId}
                  </p>
                </div>
                <div className="ml-auto">
                  <p className="font-medium">{formatPrice(topupOption.price)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tambahkan form untuk informasi pelanggan */}
          <div className="rounded-lg border bg-card p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="customer-name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="customer-name"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="customer-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="customer-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Metode pembayaran - hanya tampilkan sebagai informasi karena akan menggunakan Midtrans */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-medium mb-4">Payment Method</h2>
            <p className="text-sm text-muted-foreground mb-4">
              You will be redirected to Midtrans secure payment page to complete your payment.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <Image src="/placeholder.svg?height=40&width=40" alt="Credit Card" width={40} height={40} />
                <span className="text-xs mt-2">Credit Card</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <Image src="/placeholder.svg?height=40&width=40" alt="Bank Transfer" width={40} height={40} />
                <span className="text-xs mt-2">Bank Transfer</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <Image src="/placeholder.svg?height=40&width=40" alt="E-Wallet" width={40} height={40} />
                <span className="text-xs mt-2">E-Wallet</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <Image src="/placeholder.svg?height=40&width=40" alt="Convenience Store" width={40} height={40} />
                <span className="text-xs mt-2">Retail Outlet</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-20 rounded-lg border bg-card p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product</span>
                <span>{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {productType === "data" ? "Package" : "Top-Up Amount"}
                </span>
                <span>{topupOption.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{getUserIdLabel()}</span>
                <span>{userId}</span>
              </div>
              <div className="border-t my-3"></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(topupOption.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Admin Fee</span>
                <span>{formatPrice(2000)}</span>
              </div>
              <div className="border-t my-3"></div>
              <div className="flex justify-between font-medium">
                <span>Total Price</span>
                <span>{formatPrice(topupOption.price + 2000)}</span>
              </div>
            </div>
            <Button
              className="mt-6 w-full"
              disabled={
                isProcessing ||
                !customerName ||
                !customerEmail
              }
              onClick={handlePayment}
            >
              {isProcessing ? "Processing..." : "Pay Now with Midtrans"}
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              By proceeding with the payment, you agree to our{" "}
              <Link href="#" className="underline underline-offset-2">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}