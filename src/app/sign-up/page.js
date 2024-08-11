"use client";

import { useState } from "react";

import { string } from "yup";

import Input from "@/components/Input";
import LabeledElement from "@/components/LabeledElement";
import Button from "@/components/Button";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(true);

  const [userCreated, setUserCreated] = useState(false);

  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const validateEmail = async () => {
    const schema = string().required().email();
    setEmailValid(await schema.isValid(email));
  };

  const validatePassword = async () => {
    const schema = string().required();
    if (await schema.isValid(password)) {
      // console.log("Password is valid");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let userData = {
      username,
      email,
      password,
    };

    const res = await fetch("/api/user/create", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    setEmailExists(res?.errors?.emailExists);
    setUsernameExists(res?.errors?.usernameExists);
    setUserCreated(Object.keys(res.errors).length === 0);
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
          onChange={(event) => {
            setUsernameExists(false);
            setUsername(event.target.value);
          }}
        />
      </LabeledElement>
      {usernameExists && (
        <div className="text-red-500" data-testid="username-exists-text">
          This username already exists
        </div>
      )}
      <LabeledElement required label="Email" testId="signup-email">
        <Input
          type="email"
          testId="signup-email"
          value={email}
          onChange={(event) => {
            setEmailExists(false);
            setEmail(event.target.value);
            validateEmail();
          }}
        />
      </LabeledElement>
      {!emailValid && (
        <div className="text-red-500" data-testid="email-invalid-text">
          Please enter a valid email address
        </div>
      )}
      {emailExists && (
        <div className="text-red-500" data-testid="email-exists-text">
          This email already exists
        </div>
      )}
      <LabeledElement required label="Password" testId="signup-password">
        <Input
          type="password"
          testId="signup-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            validatePassword();
          }}
        />
      </LabeledElement>
      <Button onClick={handleSubmit} type="primary" extraClasses="mt-2">
        Create Account
      </Button>
      {userCreated && (
        <div>
          Account created successfully!
          <br />
          In the future, you will be redirected to your home page
        </div>
      )}
    </section>
  );
}
