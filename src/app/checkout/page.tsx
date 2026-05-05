"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  clearCart,
  getCartItems,
  type CartItem,
} from "@/lib/cart";
import { createPublicOrder } from "@/services/api/public";
import { Textarea } from "@/components/ui/textarea";

type PaymentMethod = "cash_on_delivery" | "mobile_money";
type Provider = "mtn" | "airtel";

const DELIVERY_FEE = 5000;

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash_on_delivery");
  const [provider, setProvider] = useState<Provider>("mtn");
  const [paymentPhone, setPaymentPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const deliveryFee = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  async function handlePlaceOrder() {
    if (!customerName || !phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (paymentMethod === "mobile_money" && !paymentPhone) {
      toast.error("Please enter the mobile money payment phone number.");
      return;
    }

    try {
      setSubmitting(true);

      const result = await createPublicOrder({
        customer_name: customerName,
        phone,
        email,
        delivery_address: deliveryAddress,
        notes,
        payment_method: paymentMethod,
        mobile_money_provider:
          paymentMethod === "mobile_money" ? provider : undefined,
        payment_phone:
          paymentMethod === "mobile_money" ? paymentPhone : undefined,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });

      setReceipt(result.data);
      clearCart();
      setCartItems([]);
      toast.success("Order placed successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Order failed.");
    } finally {
      setSubmitting(false);
    }
  }

  function downloadReceipt() {
    if (!receipt) return;

    const receiptText = `
RESTAURANT ORDER RECEIPT
Receipt No: ${receipt.receipt_number}
Order ID: ${receipt.id}
Customer: ${customerName}
Phone: ${phone}
Payment Method: ${receipt.payment_method}
Payment Status: ${receipt.payment_status}
Total: ${formatPrice(Number(receipt.total_amount))}

Items:
${receipt.items
  ?.map(
    (item: any) =>
      `- ${item.product_name} x${item.quantity} — ${formatPrice(
        Number(item.line_total)
      )}`
  )
  .join("\n")}
`;

    const blob = new Blob([receiptText], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${receipt.receipt_number}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="bg-[#fff7ed]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pt-36">
        <Button
          asChild
          variant="ghost"
          className="mb-8 rounded-full font-bold text-stone-600 hover:bg-orange-100 hover:text-red-600"
        >
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Secure Guest Checkout
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
            Confirm Your Order
          </h1>
        </div>

        {receipt && (
          <Card className="mb-8 rounded-[2rem] border-green-100 bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="font-bold">Order placed successfully</p>
                  </div>

                  <h2 className="mt-2 text-2xl font-bold text-stone-950">
                    Receipt: {receipt.receipt_number}
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    Download your receipt for reference. Your order is pending
                    restaurant confirmation.
                  </p>
                </div>

                <Button
                  onClick={downloadReceipt}
                  className="rounded-full bg-stone-950 px-6 text-white hover:bg-red-600"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <Card className="rounded-[2rem] bg-white">
            <CardContent className="space-y-6 p-6">
              <h2 className="text-2xl font-bold text-stone-950">
                Customer Details
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full name"
                  className="h-[52px] rounded-full border-orange-100 bg-orange-50 px-5"
                />

                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="h-[52px] rounded-full border-orange-100 bg-orange-50 px-5"
                />

                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email optional"
                  className="h-[52px] rounded-full border-orange-100 bg-orange-50 px-5"
                />

                <Input
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Delivery address optional"
                  className="h-[52px] rounded-full border-orange-100 bg-orange-50 px-5"
                />
              </div>

              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Order notes optional"
                className="min-h-28 w-full rounded-[1.5rem] border border-orange-100 bg-orange-50 px-5 py-4 text-sm outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
              />

              <div className="border-t border-orange-100 pt-6">
                <h2 className="text-2xl font-bold text-stone-950">
                  Payment Method
                </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Select
                    value={paymentMethod}
                    onValueChange={(value: PaymentMethod) =>
                      setPaymentMethod(value)
                    }
                  >
                    <SelectTrigger className="min-h-[52px] w-full rounded-full border-orange-100 bg-orange-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="p-2">
                      <SelectItem value="cash_on_delivery">
                        Cash on Delivery
                      </SelectItem>
                      <SelectItem value="mobile_money">
                        Mobile Money
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {paymentMethod === "mobile_money" && (
                    <Select
                      value={provider}
                      onValueChange={(value: Provider) => setProvider(value)}
                    >
                      <SelectTrigger className="min-h-[52px] w-full rounded-full border-orange-100 bg-orange-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="p-2">
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {paymentMethod === "mobile_money" && (
                  <div className="mt-4 space-y-4 rounded-[2rem] bg-orange-50 p-5">
                    <Input
                      value={paymentPhone}
                      onChange={(e) => setPaymentPhone(e.target.value)}
                      placeholder="Mobile money phone number"
                      className="h-[52px] rounded-full border-orange-100 bg-white px-5"
                    />

                    <div className="rounded-2xl bg-white p-4 text-sm leading-6 text-stone-600">
                      <p className="font-bold text-stone-950">
                        Payment Instructions
                      </p>
                      <p className="mt-2">
                        After placing your order, complete payment using your
                        selected mobile money provider. Your order will remain
                        pending until payment is confirmed by the restaurant.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit rounded-[2rem] bg-white lg:sticky lg:top-24">
            <CardContent className="space-y-5 p-6">
              <h2 className="text-2xl font-bold text-stone-950">
                Order Summary
              </h2>

              <div className="space-y-3">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4 rounded-2xl bg-orange-50 p-3 text-sm"
                    >
                      <div>
                        <p className="font-bold text-stone-950">{item.name}</p>
                        <p className="text-stone-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-red-600">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-2xl bg-orange-50 p-4 text-sm text-stone-500">
                    Your cart is empty.
                  </p>
                )}
              </div>

              <div className="space-y-4 border-t border-orange-100 pt-5">
                <div className="flex justify-between text-sm font-bold text-stone-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-500">
                  <span>Delivery</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-lg font-bold text-stone-950">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Button
                disabled={submitting || cartItems.length === 0}
                onClick={handlePlaceOrder}
                className="h-[52px] w-full rounded-full bg-red-600 text-base font-bold text-white shadow-xl shadow-red-600/20 hover:bg-red-700"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {submitting ? "Placing Order..." : "Place Order"}
              </Button>

              <p className="text-center text-xs font-medium leading-6 text-stone-400">
                No account required. Receipt is available after ordering.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}