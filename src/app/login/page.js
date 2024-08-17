"use client";

import { useState } from "react";
import { login } from "@/actions/login";

import Input from "@/components/Input";
import LabeledElement from "@/components/LabeledElement";
import Button from "@/components/Button";

export default function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit() {
    const signInResult = await login({ username, password });

    console.log("Sign in result: ", signInResult);
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
          testId="signup-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </LabeledElement>
      <Button onClick={onSubmit} type="primary" extraClasses="mt-2">
        Log In
      </Button>
    </section>
  );
}
