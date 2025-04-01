"use client";
import React from "react";
import LoginPage from "@/components/LoginPage";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const handleLogin = async (email, password) => {};

  const handleCancel = () => {
    router.push("/");
  };
  return <LoginPage onSubmit={handleLogin} onCancel={handleCancel} />;
}
