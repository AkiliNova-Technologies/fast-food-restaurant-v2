import Link from "next/link";
import { ArrowLeft, ChefHat, ShieldCheck } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center sm:min-h-[calc(100vh-5rem)]">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_440px] lg:gap-12">
          <section className="hidden lg:block">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-600 shadow-sm transition hover:bg-stone-950 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Website
            </Link>

            <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
              <ShieldCheck className="h-4 w-4" />
              Restaurant Dashboard
            </div>

            <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-stone-950 xl:text-5xl">
              Manage your menu, offers and customer orders from one clean place.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">
              A streamlined control center for your restaurant — update your
              menu in seconds, monitor orders in real time, and manage customer
              interactions effortlessly.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["Menu", "Update items"],
                ["Orders", "Track sales"],
                ["Messages", "Serve customers"],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm"
                >
                  <p className="font-bold text-stone-950">{title}</p>
                  <p className="mt-1 text-xs font-medium text-stone-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full">
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <Link href="/" className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-red-600 text-white">
                  <ChefHat className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-base font-bold leading-none text-stone-950">
                    Fast Bite
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                    Dashboard
                  </p>
                </div>
              </Link>

              <Link
                href="/"
                className="rounded-full bg-white px-4 py-2 text-xs font-bold text-stone-600 shadow-sm"
              >
                Website
              </Link>
            </div>

            <LoginForm />
          </section>
        </div>
      </div>
    </main>
  );
}