"use client";

import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

import { sendContactMessage } from "@/services/api/public";
import { Textarea } from "@/components/ui/textarea";

const contactCards = [
  {
    title: "Call Us",
    value: "+256 700 000 000",
    icon: Phone,
  },
  {
    title: "Email",
    value: "orders@foodrush.com",
    icon: Mail,
  },
  {
    title: "Location",
    value: "Kampala, Uganda",
    icon: MapPin,
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !message) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setLoading(true);

      await sendContactMessage({
        name,
        email: contact.includes("@") ? contact : undefined,
        phone: !contact.includes("@") ? contact : undefined,
        message,
      });

      toast.success("Message sent successfully");

      // reset
      setName("");
      setContact("");
      setMessage("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="bg-[#fff7ed]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-stone-950 px-4 pt-28 pb-14 text-white sm:px-6 lg:px-8 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.28),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.24),transparent_38%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-300 sm:text-sm">
            Contact Us
          </p>

          <h1 className="mt-4 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
            Hungry? Let’s get your order moving.
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-stone-300 sm:text-base">
            Reach out for delivery, reservations, bulk orders, event catering,
            or feedback.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT SIDE */}
          <div>
            {/* CONTACT CARDS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {contactCards.map((item) => (
                <Card
                  key={item.title}
                  className="rounded-[1.5rem] border border-orange-100 bg-white sm:rounded-[2rem]"
                >
                  <CardContent className="p-4 sm:px-5">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-50 text-red-600">
                      <item.icon className="h-5 w-5" />
                    </div>

                    <h2 className="mt-4 text-base font-bold text-stone-950 sm:text-lg">
                      {item.title}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-stone-500">
                      {item.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* MAP */}
            <Card className="mt-6 overflow-hidden rounded-[1.5rem] bg-white p-0 sm:rounded-[2rem]">
              <div className="grid min-h-[240px] place-items-center bg-orange-100 p-6 text-center sm:min-h-[320px]">
                <div>
                  <MapPin className="mx-auto h-10 w-10 text-red-600 sm:h-12 sm:w-12" />

                  <h2 className="mt-4 text-2xl font-bold text-stone-950 sm:text-3xl">
                    Our Location
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-stone-500 sm:text-base">
                    Find us easily using Google Maps. We’re located in the heart
                    of Kampala.
                  </p>

                  <Button
                    asChild
                    className="mt-5 rounded-full bg-stone-950 px-6 text-white hover:bg-red-600"
                  >
                    <Link href="https://maps.google.com" target="_blank">
                      Open in Maps
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* HOURS */}
            <Card className="rounded-[2rem] border-orange-100 bg-white ">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-50 text-orange-600">
                    <Clock className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-stone-950 sm:text-xl">
                      Opening Hours
                    </h2>
                    <p className="text-xs font-semibold text-stone-500 sm:text-sm">
                      Fresh meals daily
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    ["Monday - Friday", "8:00 AM - 10:00 PM"],
                    ["Saturday", "9:00 AM - 11:00 PM"],
                    ["Sunday", "10:00 AM - 9:00 PM"],
                  ].map(([day, time]) => (
                    <div
                      key={day}
                      className="flex justify-between rounded-lg bg-orange-50 px-3 py-2 text-sm font-medium"
                    >
                      <span className="text-stone-600">{day}</span>
                      <span className="text-stone-950">{time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FORM */}
            <Card className="rounded-[2rem] border-orange-100 bg-white ">
              <CardContent className="p-5 sm:p-6">
                <h2 className="text-xl font-bold text-stone-950 sm:text-2xl">
                  Send a Message
                </h2>

                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>

                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-11 rounded-full bg-orange-50 px-4 text-sm"
                  />

                  <Input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Email or phone number"
                    className="h-11 rounded-full bg-orange-50 px-4 text-sm"
                  />

                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    className="min-h-28 w-full rounded-xl bg-orange-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                  />

                  <Button
                    disabled={loading}
                    className="h-11 w-full rounded-full bg-red-600 text-sm font-bold text-white hover:bg-red-700"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>

                {/* WHATSAPP CTA */}
                <Button
                  asChild
                  variant="outline"
                  className="mt-3 h-11 w-full rounded-full border-green-500 text-green-600 hover:bg-green-50"
                >
                  <Link href="https://wa.me/256700000000" target="_blank">
                    Chat on WhatsApp
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
