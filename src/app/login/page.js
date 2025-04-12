"use client";
import React, { useState } from "react";
import LoginPage from "@/components/LoginPage";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const loginUser = async (email, password) => {
    setError(""); // Clear previous error message
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/dashboard");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div>
      <LoginPage
        onSubmit={loginUser}
        onCancel={handleCancel}
        error={error} // Pass error as a prop
      />
    </div>
  );
}
