"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHatIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { login } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState(
    process.env.NODE_ENV === "development" ? "admin@restaurant.com" : "",
  );

  const [password, setPassword] = useState(
    process.env.NODE_ENV === "development" ? "admin12345" : "",
  );

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);

      const trimmedEmail = email.trim().toLowerCase();

      await login({
        email: trimmedEmail,
        password,
      });

      toast.success("Login successful");
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md rounded-[2rem] border-orange-100 bg-white">
      <CardContent className="p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-[1.5rem] bg-red-600 text-white">
            <ChefHatIcon className="size-7" />
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-stone-950">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Sign in to manage menu items, offers, orders and messages.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="font-bold text-stone-700">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-2xl border-orange-200"
              placeholder="admin@restaurant.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-stone-700">Password</Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 rounded-2xl border-orange-200 pr-12"
                placeholder="••••••••"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-600"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            disabled={submitting}
            className="h-12 w-full rounded-2xl bg-red-600 font-bold text-white hover:bg-red-700"
          >
            {submitting && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
