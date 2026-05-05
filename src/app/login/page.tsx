import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_460px]">
          <section className="hidden lg:block">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">
              Restaurant Dashboard
            </p>

            <h1 className="mt-4 max-w-2xl text-5xl font-black tracking-tight text-stone-950">
              Manage your menu, offers and customer orders from one clean place.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
              A streamlined control center for your restaurant — update your
              menu in seconds, monitor orders in real time, and manage customer
              interactions effortlessly.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-full bg-stone-950 px-6 py-3 text-sm font-bold text-white hover:bg-red-600"
            >
              Back to Website
            </Link>
          </section>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
