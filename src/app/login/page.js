"use client";
import React from "react";
import LoginPage from "@/components/LoginPage";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function Login() {
  const router = useRouter();
  const loginUser = async (email, password) => {
    signIn("credentials", { email, password, redirect: false });
    router.push("/dashboard");
  };

  const handleCancel = () => {
    router.push("/");
  };
  return <LoginPage onSubmit={loginUser} onCancel={handleCancel} />;
}
