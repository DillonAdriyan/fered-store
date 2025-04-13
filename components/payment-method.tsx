import React from "react";

// Data Payment
const payment = [
  { id: "dana", name: "Dana", image: "/logo/dana.webp" },
  { id: "bri", name: "BRI", image: "/logo/bri.png" },
  { id: "bca", name: "BCA", image: "/logo/bca.png" },
  { id: "bni", name: "BNI", image: "/logo/bni.png" },
  { id: "briva", name: "BRIVA", image: "/logo/briva.png" },
  { id: "mandiri", name: "MANDIRI", image: "/logo/mandiri.png" },
  { id: "qris", name: "QRIS", image: "/logo/qris.png" },
  { id: "alfamart", name: "Alfamart", image: "/logo/alfa.png" },
  { id: "indomaret", name: "Indomaret", image: "/logo/indomaret.png" },
  { id: "shopeepay", name: "Shopeepay", image: "/logo/shopepay.webp" },
  { id: "ovo", name: "OVO", image: "/logo/ovo2.png" },
  { id: "gopay", name: "Gopay", image: "/logo/goPay.png" },
];

// Pisahkan bank & e-wallet
const banks = payment.filter((p) =>
  ["bri", "bca", "bni", "mandiri", "briva"].includes(p.id)
);
const ewallets = payment.filter(
  (p) => !["bri", "bca", "bni", "mandiri", "briva"].includes(p.id)
);

const BrickGridMarquee = () => {
  return (
    <div className="space-y-2">
      {/* ================== BARIS ATAS: BANKS ================== */}
      <div className="relative overflow-hidden
      w-full h-16">
        {/* 
          - absolute: agar si "strip" konten bisa kita geser 
          - w-[200%]: total lebar 2x isi, agar bisa di-translateX(-50%) tanpa putus
          - animate-marquee: jalankan animasi
        */}
        <div className="absolute top-0 left-0 flex w-[200%] animate-marquee">
          {/* Duplikat data bank agar mulus saat looping */}
          {banks.concat(banks).map((item, idx) => (
            <div
              key={idx}
              className="w-36 h-16 bg-white
              flex-none flex items-center
              justify-center mx-2 rounded-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-8 w-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================== BARIS BAWAH: E-WALLETS + KOTAK PUTIH ================== */}
      <div className="relative overflow-hidden
      w-full h-[74px]">
        <div className="absolute top-0 left-0 flex w-[200%] animate-marquee">
          {/* Duplikat data e-wallet agar looping mulus */}
          {ewallets.concat(ewallets).map((item, idx) => (
            <div key={idx} className="flex flex-none items-center">
              {/* 
                Kotak putih di sebelah kiri barisan, 
                jika mau sekali saja di awal setiap "set" 
                maka cek idx untuk menaruhnya di item pertama 
              */}
              {idx === 0 && (
                <div className="w-16 h-16 bg-white
                flex-none mx-2 rounded" />
              )}
              <div className="w-36 h-16 bg-white
              flex-none flex items-center
              justify-center m-2 rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-8  w-auto
                  object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrickGridMarquee;
