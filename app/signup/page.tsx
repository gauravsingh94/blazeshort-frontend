"use client";

import { AnimatedContainer } from "@/components/common/animated-container";
import {
  AuthCard,
  AuthHeader,
  ErrorMessage,
} from "@/components/common/auth-card";
import { BrandLogo } from "@/components/common/brand-logo";
import { FormField } from "@/components/common/form-field";
import { ButtonLoadingSpinner } from "@/components/common/loading-spinner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await api.signup(formData.email, formData.password);
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
      // @ts-ignore
      if (err.message === "Username is already in use") {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-96 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-96 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />
      </div>

      <AnimatedContainer className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex items-center justify-center">
            <BrandLogo href="/" />
          </div>
          <AuthHeader
            title="Create your account"
            subtitle="Start shortening URLs in seconds"
          />
        </div>

        {/* Form Card */}
        <AuthCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}

            <FormField
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />

            <FormField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              helperText="At least 6 characters"
            />

            <FormField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 h-10 mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <ButtonLoadingSpinner />
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-xs text-center text-muted-foreground">
            By signing up, you agree to our{" "}
            <a href="#" className="text-primary hover:text-primary/80">
              Terms of Service
            </a>
          </div>
        </AuthCard>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Sign in
          </Link>
        </div>
      </AnimatedContainer>
    </main>
  );
}
