"use client"

<<<<<<< HEAD
import { useState, useCallback, memo } from "react"
=======
import { useState } from "react"
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
import { ChevronDown, Smartphone, Wallet, Wifi, GamepadIcon as GameController } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ProductsPageProps {
  product: any
  productType: string
  topupOptions: any[]
  paymentMethods: any[]
  onBack: () => void
  onProceedToCheckout: (product: any, topupOption: any, paymentMethod: any, userId: string) => void
}

<<<<<<< HEAD
// Memoize the TopupOption component to prevent unnecessary re-renders
const TopupOption = memo(
  ({
    option,
    isSelected,
    onClick,
    formatPrice,
  }: {
    option: any
    isSelected: boolean
    onClick: () => void
    formatPrice: (price: number) => string
  }) => (
    <div
      className={cn(
        "cursor-pointer rounded-lg border p-4 transition-colors",
        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50",
      )}
      onClick={onClick}
    >
      <div className="font-medium">{option.name}</div>
      {option.description && <p className="text-xs text-muted-foreground mt-1">{option.description}</p>}
      <div className="mt-1 flex items-center gap-2">
        {option.discount > 0 && (
          <span className="text-xs line-through text-muted-foreground">
            {formatPrice(option.price * (1 + option.discount / 100))}
          </span>
        )}
        <span className="text-sm font-medium">{formatPrice(option.price)}</span>
      </div>
      {option.discount > 0 && (
        <div className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
          {option.discount}% OFF
        </div>
      )}
    </div>
  ),
)
TopupOption.displayName = "TopupOption"

// Memoize the PaymentMethod component to prevent unnecessary re-renders
const PaymentMethod = memo(
  ({
    method,
    isSelected,
    onClick,
  }: {
    method: any
    isSelected: boolean
    onClick: () => void
  }) => (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50",
      )}
      onClick={onClick}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
        <method.icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-medium">{method.name}</div>
        <p className="text-xs text-muted-foreground">{method.description}</p>
      </div>
    </div>
  ),
)
PaymentMethod.displayName = "PaymentMethod"

=======
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
export default function ProductsPage({
  product,
  productType,
  topupOptions,
  paymentMethods,
  onBack,
  onProceedToCheckout,
}: ProductsPageProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null)
  const [userId, setUserId] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

<<<<<<< HEAD
  const formatPrice = useCallback((price: number) => {
=======
  const formatPrice = (price: number) => {
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
<<<<<<< HEAD
  }, [])

  const handleProceedToCheckout = useCallback(() => {
=======
  }

  const handleProceedToCheckout = () => {
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
    if (selectedOption && selectedPayment) {
      const topupOption = topupOptions.find((o) => o.id === selectedOption)
      const paymentMethod = paymentMethods.find((m) => m.id === selectedPayment)
      if (topupOption && paymentMethod) {
        const userIdentifier = productType === "game" ? userId : phoneNumber
        onProceedToCheckout(product, topupOption, paymentMethod, userIdentifier)
      }
    }
<<<<<<< HEAD
  }, [
    selectedOption,
    selectedPayment,
    userId,
    phoneNumber,
    topupOptions,
    paymentMethods,
    productType,
    product,
    onProceedToCheckout,
  ])

  // Get the appropriate icon based on product type
  const getProductIcon = useCallback(() => {
=======
  }

  // Get the appropriate icon based on product type
  const getProductIcon = () => {
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
    switch (productType) {
      case "game":
        return <GameController className="h-6 w-6" />
      case "ewallet":
        return <Wallet className="h-6 w-6" />
      case "data":
        return <Wifi className="h-6 w-6" />
      case "pulsa":
        return <Smartphone className="h-6 w-6" />
      default:
        return <GameController className="h-6 w-6" />
    }
<<<<<<< HEAD
  }, [productType])

  // Get the appropriate label based on product type
  const getUserIdLabel = useCallback(() => {
=======
  }

  // Get the appropriate label based on product type
  const getUserIdLabel = () => {
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
    switch (productType) {
      case "game":
        return "User ID"
      case "ewallet":
        return "Phone Number"
      case "data":
        return "Phone Number"
      case "pulsa":
        return "Phone Number"
      default:
        return "User ID"
    }
<<<<<<< HEAD
  }, [productType])

  // Get the appropriate placeholder based on product type
  const getUserIdPlaceholder = useCallback(() => {
=======
  }

  // Get the appropriate placeholder based on product type
  const getUserIdPlaceholder = () => {
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
    switch (productType) {
      case "game":
        return "Enter your game ID"
      case "ewallet":
        return "Enter your phone number"
      case "data":
        return "Enter your phone number"
      case "pulsa":
        return "Enter your phone number"
      default:
        return "Enter your ID"
    }
<<<<<<< HEAD
  }, [productType])

  // Get the appropriate helper text based on product type
  const getUserIdHelperText = useCallback(() => {
=======
  }

  // Get the appropriate helper text based on product type
  const getUserIdHelperText = () => {
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
    switch (productType) {
      case "game":
        return "Enter your game ID to receive the top-up"
      case "ewallet":
        return "Enter your phone number linked to your e-wallet"
      case "data":
        return "Enter your phone number to receive the data package"
      case "pulsa":
        return "Enter your phone number to receive the pulsa"
      default:
        return "Enter your ID to receive the top-up"
    }
<<<<<<< HEAD
  }, [productType])

  // Get the appropriate title based on product type
  const getTitle = useCallback(() => {
=======
  }

  // Get the appropriate title based on product type
  const getTitle = () => {
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
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
<<<<<<< HEAD
  }, [productType])
=======
  }
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5

  return (
    <div className="container px-4 py-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronDown className="mr-2 h-4 w-4 rotate-90" />
        Back to {getTitle()}
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            {product.image ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
<<<<<<< HEAD
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
=======
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
              </div>
            ) : (
              <div className={`h-16 w-16 rounded-lg ${product.color || "bg-primary"} flex items-center justify-center`}>
                {getProductIcon()}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-sm text-muted-foreground">{product.category || getTitle()}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">1. Enter Your {getUserIdLabel()}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="user-id" className="text-sm font-medium">
                  {getUserIdLabel()}
                </label>
                {productType === "game" ? (
                  <Input
                    id="user-id"
                    placeholder={getUserIdPlaceholder()}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                ) : (
                  <Input
                    id="phone-number"
                    placeholder={getUserIdPlaceholder()}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                  />
                )}
                <p className="mt-1 text-xs text-muted-foreground">{getUserIdHelperText()}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">
              2. Select {productType === "data" ? "Package" : "Top-Up Amount"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {topupOptions.map((option) => (
<<<<<<< HEAD
                <TopupOption
                  key={option.id}
                  option={option}
                  isSelected={selectedOption === option.id}
                  onClick={() => setSelectedOption(option.id)}
                  formatPrice={formatPrice}
                />
=======
                <div
                  key={option.id}
                  className={cn(
                    "cursor-pointer rounded-lg border p-4 transition-colors",
                    selectedOption === option.id ? "border-primary bg-primary/5" : "hover:border-primary/50",
                  )}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="font-medium">{option.name}</div>
                  {option.description && <p className="text-xs text-muted-foreground mt-1">{option.description}</p>}
                  <div className="mt-1 flex items-center gap-2">
                    {option.discount > 0 && (
                      <span className="text-xs line-through text-muted-foreground">
                        {formatPrice(option.price * (1 + option.discount / 100))}
                      </span>
                    )}
                    <span className="text-sm font-medium">{formatPrice(option.price)}</span>
                  </div>
                  {option.discount > 0 && (
                    <div className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      {option.discount}% OFF
                    </div>
                  )}
                </div>
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">3. Select Payment Method</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
<<<<<<< HEAD
                <PaymentMethod
                  key={method.id}
                  method={method}
                  isSelected={selectedPayment === method.id}
                  onClick={() => setSelectedPayment(method.id)}
                />
=======
                <div
                  key={method.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                    selectedPayment === method.id ? "border-primary bg-primary/5" : "hover:border-primary/50",
                  )}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </div>
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
              ))}
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
                <span className="text-muted-foreground">{getUserIdLabel()}</span>
                <span>{productType === "game" ? userId || "-" : phoneNumber || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{productType === "data" ? "Package" : "Top-Up Amount"}</span>
                <span>{selectedOption ? topupOptions.find((o) => o.id === selectedOption)?.name : "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span>{selectedPayment ? paymentMethods.find((m) => m.id === selectedPayment)?.name : "-"}</span>
              </div>
              <div className="border-t my-3"></div>
              <div className="flex justify-between font-medium">
                <span>Total Price</span>
                <span>
                  {selectedOption ? formatPrice(topupOptions.find((o) => o.id === selectedOption)?.price || 0) : "-"}
                </span>
              </div>
            </div>
            <Button
              className="mt-6 w-full"
              disabled={!selectedOption || !selectedPayment || (productType === "game" ? !userId : !phoneNumber)}
              onClick={handleProceedToCheckout}
            >
              Proceed to Payment
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

