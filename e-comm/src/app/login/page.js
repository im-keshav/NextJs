"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function LoginPage() {
  const router = useRouter();
  const { hydrateUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      let res = await api.post("/api/auth/login", formData);
      await hydrateUser();
      router.push("/home");
    } catch (err) {
      console.log("error in login", err);
      setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-lg dark:shadow-slate-900/50">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please enter your details to sign in to your account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-xl bg-destructive/15 p-3 text-xs font-semibold text-destructive border border-destructive/20 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-input bg-background pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-4 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        {/* Footer / Account Propagation Link */}
        <div className="text-center pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link 
              href="/register" 
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}