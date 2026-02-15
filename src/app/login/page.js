"use client";

import { useState } from "react";
import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";

import Input from "@/components/Input";
import LabeledElement from "@/components/LabeledElement";
import Button from "@/components/Button";

export default function LogInPage() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    setError("");

    const validatedFields = LoginSchema.safeParse({ username, password });
    if (!validatedFields.success) {
      setError("Please enter both username and password.");
      return;
    }

    const callbackUrl = searchParams.get("callbackUrl");
    const signInResult = await login({ username, password }, callbackUrl);

    if (signInResult?.error) {
      setError(signInResult.error);
    }
  }

  return (
    <section
      className="flex flex-col p-6 w-full m-4 bg-gray-200 rounded-md items-center h-screen"
      data-testid="log-in-home-page"
    >
      <h1 className="text-2xl mb-4">Log In</h1>
      <LabeledElement required label="Username" testId="login-username">
        <Input
          testId="login-username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </LabeledElement>
      <LabeledElement required label="Password" testId="login-password">
        <Input
          type="password"
          testId="login-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </LabeledElement>
      <Button onClick={onSubmit} type="primary" extraClasses="mt-2">
        Log In
      </Button>
      {error && (
        <div className="text-red-500 mt-2" data-testid="login-error-text">
          {error}
        </div>
      )}
    </section>
  );
}
