// components/ProductsPage.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import md5 from "crypto-js/md5";

interface Product {
  id: string;
  name: string;
  image?: string;
  color?: string;
  category?: string;
}

interface TopupOption {
  id: string;
  name: string;
  price: number;
  discount: number;
  description?: string;
}

interface PaymentMethod {
  id: string | number;
  name: string;
  description?: string;
  type: string;
  options?: Array<any>;
}

interface ProductsPageProps {
  product: Product;
  productType: string;
  topupOptions: TopupOption[];
  paymentMethods: PaymentMethod[];
  onBack: () => void;
  onProceedToCheckout: (
    product: Product,
    topupOption: TopupOption,
    paymentMethod: PaymentMethod,
    userId: string
  ) => void;
}

export default function ProductsPage({
  product,
  productType,
  topupOptions,
  paymentMethods,
  onBack,
  onProceedToCheckout,
}: ProductsPageProps) {
  // State untuk opsi top-up, payment method, dan user input
  const [selectedTopupOption, setSelectedTopupOption] = useState<TopupOption | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [fetchedUsername, setFetchedUsername] = useState<string>("");

  // Fungsi untuk mendapatkan game_code berdasarkan produk yang dipilih
  const getGameCode = () => {
    // Pastikan hanya dipanggil jika productType adalah "game"
    if (productType !== "game") return "";
    // Contoh sederhana: periksa product.id untuk menentukan kode game
    if (product.id === "free-fire") return "freefire";
    if (product.id === "mobile-legends") return "ml";
    if (product.id === "call-of-duty-mobile")
    return "codm";
    if (product.id === "genshin-impact") return
    "genshin";
    return "";
  };

  // Fungsi untuk mengecek akun game


const checkGameAccount = async () => {
  if (!userId) return;
  try {
    // Gunakan environment variable dengan prefix NEXT_PUBLIC agar tersedia di client-side
    const secretKey = process.env.NEXT_PUBLIC_VELIX_GAME_CHECK_KEY;
    const gameCode = getGameCode();
    if (!secretKey || !gameCode) {
      console.error("Konfigurasi API tidak lengkap");
      setFetchedUsername("Konfigurasi API tidak lengkap");
      return;
    }

    // Siapkan body request untuk API POST
    const requestBody: any = {
      game: gameCode,
      id: userId,
      apikey: secretKey,
    };

    // Jika game adalah Mobile Legends, pastikan zoneId ada
    if (gameCode === "ml") {
      if (!zoneId) {
        setFetchedUsername("Zone ID wajib diisi untuk Mobile Legends");
        return;
      }
      requestBody.zoneid = zoneId;
    }

    const response = await fetch("https://api.velixs.com/idgames-checker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data && data.status && data.data && data.data.username) {
      setFetchedUsername(data.data.username);
    } else {
      setFetchedUsername("Data Not Found");
    }
  } catch (error) {
    console.error("Error checking account", error);
    setFetchedUsername("Error checking account");
  }
};

  const handleProceed = () => {
    if (product && selectedTopupOption && selectedPaymentMethod && userId.trim()) {
      onProceedToCheckout(product, selectedTopupOption, selectedPaymentMethod, userId.trim());
    } else {
      alert("Silakan pilih opsi top-up, payment method, dan masukkan User ID / Phone Number");
    }
  };

  return (
    <div className="container px-4 py-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        Back
      </Button>

      <div className="flex items-center gap-4 mb-6">
        {product.image ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-lg">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
        ) : (
          <div className={`h-16 w-16 rounded-lg ${product.color || "bg-primary"} flex items-center justify-center`}>
            {product.name.charAt(0)}
          </div>
        )}
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </div>

      {/* Input User ID / Phone Number dengan tombol "Cek Akun" */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">
          {productType === "game" ? "Game ID" : "Phone Number"}
        </label>
        <div className="flex gap-2">
{product.id === 'mobile-legends' ? (
  <div className="flex gap-2 w-full">
    <Input
      className="w-2/3"
      value={userId}
      onChange={(e) => {
        setUserId(e.target.value);
        setFetchedUsername("");
      }}
      placeholder="User ID"
    />
    <Input
      className="w-1/3"
      value={zoneId}
      onChange={(e) => {
        setZoneId(e.target.value);
        setFetchedUsername("");
      }}
      placeholder="Zone ID"
    />
  </div>
) : 
 

        
          <Input
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setFetchedUsername(""); // Reset username saat user ubah input
            }}
            placeholder={productType === "game" ? "Enter your Game ID" : "Enter your Phone Number"}
          />
}
          {productType === "game" && (
            <Button onClick={checkGameAccount} variant="outline">
              Cek Akun
            </Button>
          )}
        </div>
        {fetchedUsername && (
          <p className="mt-2 text-sm text-green-600">
            Username: <span className="font-medium">{fetchedUsername}</span>
          </p>
        )}
      </div>

      {/* Opsi Top-Up */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Top-Up Option</h2>
        <div className="grid grid-cols-2 gap-4">
          {topupOptions.map((option) => (
  <div
    key={option.id}
    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
      selectedTopupOption?.id === option.id ? "border-primary" : "border-gray-200"
    }`}
    onClick={() => setSelectedTopupOption(option)}
  >
    <h3 className="font-medium">{option.name}</h3>
    <p className="text-sm text-muted-foreground">
      Price: Rp {option.price.toLocaleString("id-ID")}
    </p>
    {option.discount > 0 && (
      <p className="text-sm text-red-500">Discount: {option.discount}%</p>
    )}
    {option.description && <p className="text-xs text-muted-foreground">{option.description}</p>}
  </div>
))}

        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Payment Method</h2>
        <div className="grid grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedPaymentMethod?.id === method.id ? "border-primary" : "border-gray-200"
              }`}
              onClick={() => setSelectedPaymentMethod(method)}
            >
              <h3 className="font-medium">{method.name}</h3>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleProceed}
        disabled={!selectedTopupOption || !selectedPaymentMethod || !userId.trim()}
        className="w-full"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
