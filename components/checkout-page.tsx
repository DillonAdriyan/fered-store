"use client"

import { useState, useCallback, memo } from "react"
import { ChevronDown, GamepadIcon as GameController, Smartphone, Store, Wallet, Wifi } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface CheckoutPageProps {
  product: {
    id: number
    name: string
    image?: string
    category?: string
    color?: string
    icon?: any
  }
  productType: string
  topupOption: {
    id: number
    name: string
    price: number
    discount: number
    description?: string
  }
  paymentMethod: {
    id: number
    name: string
    icon: any
    type: string
    options?: {
      id: string
      name: string
    }[]
  }
  userId: string
  onBack: () => void
}

// Memoize the PaymentOption component to prevent unnecessary re-renders
const PaymentOption = memo(
  ({
    option,
    isSelected,
    onClick,
    icon: Icon,
  }: {
    option: { id: string; name: string }
    isSelected: boolean
    onClick: () => void
    icon: any
  }) => (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50",
      )}
      onClick={onClick}
    >
      <RadioGroupItem value={option.id} id={option.id} />
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
        <Icon className="h-5 w-5" />
      </div>
      <label htmlFor={option.id} className="font-medium cursor-pointer flex-1">
        {option.name}
      </label>
    </div>
  ),
)
PaymentOption.displayName = "PaymentOption"

// Memoize the QRCode component
const QRCode = memo(() => (
  <div className="flex flex-col items-center p-4">
    <div className="bg-white p-4 rounded-lg mb-4">
      <div className="aspect-square w-48 relative">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="QRIS Code"
          fill
          className="object-contain"
          sizes="192px"
        />
      </div>
    </div>
    <p className="text-center text-sm text-muted-foreground">Scan this QR code with any QRIS-compatible e-wallet app</p>
  </div>
))
QRCode.displayName = "QRCode"

// Memoize the PaymentInstructions component
const PaymentInstructions = memo(
  ({
    type,
    selectedOption,
    options,
  }: {
    type: string
    selectedOption: string | null
    options?: { id: string; name: string }[]
  }) => (
    <div className="rounded-lg bg-muted p-4">
      <h3 className="font-medium mb-2">Payment Instructions:</h3>
      {type === "store" ? (
        <ol className="list-decimal pl-5 text-sm space-y-1">
          <li>
            Go to your nearest{" "}
            {selectedOption && options ? options.find((o) => o.id === selectedOption)?.name : "convenience store"}
          </li>
          <li>Show the payment code to the cashier</li>
          <li>Make the payment</li>
          <li>Keep your receipt as proof of payment</li>
        </ol>
      ) : (
        <ol className="list-decimal pl-5 text-sm space-y-1">
          <li>Open your e-wallet app (GoPay, OVO, DANA, etc.)</li>
          <li>Scan the QR code above</li>
          <li>Confirm the payment amount</li>
          <li>Complete the payment in your app</li>
        </ol>
      )}
    </div>
  ),
)
PaymentInstructions.displayName = "PaymentInstructions"

export default function CheckoutPage({
  product,
  productType,
  topupOption,
  paymentMethod,
  userId,
  onBack,
}: CheckoutPageProps) {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<string | null>(
    paymentMethod.options && paymentMethod.options.length > 0 ? paymentMethod.options[0].id : null,
  )
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }, [])

  const handlePayment = useCallback(() => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("Payment successful! Your credits will be added to your account shortly.")
      onBack()
    }, 2000)
  }, [onBack])

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

          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-medium mb-4">Payment Method: {paymentMethod.name}</h2>

            {paymentMethod.type === "card" && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="card-number" className="text-sm font-medium">
                    Card Number
                  </label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="card-name" className="text-sm font-medium">
                    Cardholder Name
                  </label>
                  <Input
                    id="card-name"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="card-expiry" className="text-sm font-medium">
                      Expiry Date
                    </label>
                    <Input
                      id="card-expiry"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvv" className="text-sm font-medium">
                      CVV
                    </label>
                    <Input
                      id="card-cvv"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod.type === "ewallet" && paymentMethod.options && (
              <div className="space-y-4">
                <RadioGroup value={selectedPaymentOption || ""} onValueChange={setSelectedPaymentOption}>
                  <div className="grid gap-3">
                    {paymentMethod.options.map((option) => (
                      <PaymentOption
                        key={option.id}
                        option={option}
                        isSelected={selectedPaymentOption === option.id}
                        onClick={() => setSelectedPaymentOption(option.id)}
                        icon={Wallet}
                      />
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {paymentMethod.type === "store" && paymentMethod.options && (
              <div className="space-y-4">
                <RadioGroup value={selectedPaymentOption || ""} onValueChange={setSelectedPaymentOption}>
                  <div className="grid gap-3">
                    {paymentMethod.options.map((option) => (
                      <PaymentOption
                        key={option.id}
                        option={option}
                        isSelected={selectedPaymentOption === option.id}
                        onClick={() => setSelectedPaymentOption(option.id)}
                        icon={Store}
                      />
                    ))}
                  </div>
                </RadioGroup>
                <PaymentInstructions
                  type="store"
                  selectedOption={selectedPaymentOption}
                  options={paymentMethod.options}
                />
              </div>
            )}

            {paymentMethod.type === "qris" && (
              <div className="space-y-4">
                <QRCode />
                <PaymentInstructions type="qris" selectedOption={null} />
              </div>
            )}
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
                <span className="text-muted-foreground">{productType === "data" ? "Package" : "Top-Up Amount"}</span>
                <span>{topupOption.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{getUserIdLabel()}</span>
                <span>{userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span>{paymentMethod.name}</span>
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
                (paymentMethod.type === "card" && (!cardNumber || !cardName || !cardExpiry || !cardCvv)) ||
                ((paymentMethod.type === "ewallet" || paymentMethod.type === "store") && !selectedPaymentOption)
              }
              onClick={handlePayment}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
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
  )
}

