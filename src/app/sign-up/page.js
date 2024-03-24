"use client";
import { useState } from "react";

import Input from "@/components/Input";
import LabeledElement from "@/components/LabeledElement";
import Button from "@/components/Button";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // add data validation

  async function handleSubmit(e) {
    e.preventDefault();
    let userData = {
      username,
      email,
      password,
    };

    const res = fetch("/api/user/create", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <section
      className="flex flex-col p-6 w-full m-4 bg-gray-200 rounded-md items-center h-screen"
      data-testid="sign-up-home-page"
    >
      <h1 className="text-2xl mb-4">Create an Account</h1>
      <LabeledElement required label="Username" testId="signup-username">
        <Input
          testId="signup-username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </LabeledElement>
      <LabeledElement required label="Email" testId="signup-email">
        <Input
          type="email"
          testId="signup-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </LabeledElement>
      <LabeledElement required label="Password" testId="signup-password">
        <Input
          type="password"
          testId="signup-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </LabeledElement>
      <Button onClick={handleSubmit} type="primary" extraClasses="mt-2">
        Create Account
      </Button>
    </section>
  );
}
