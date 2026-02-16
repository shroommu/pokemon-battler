"use client";

import { useState } from "react";

import Input from "@/components/Input";
import LabeledElement from "@/components/LabeledElement";
import Button from "@/components/Button";
import { createUser } from "@/actions/createUser";
import { SignUpSchema } from "@/schemas";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userCreated, setUserCreated] = useState(false);

  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: [],
    email: [],
    password: [],
  });

  const hasFieldErrors =
    fieldErrors.username.length > 0 ||
    fieldErrors.email.length > 0 ||
    fieldErrors.password.length > 0;

  async function handleSubmit(e) {
    e.preventDefault();

    setUserCreated(false);
    setUsernameExists(false);
    setEmailExists(false);

    const userData = {
      username,
      email,
      password,
    };

    const validatedFields = SignUpSchema.safeParse(userData);
    if (!validatedFields.success) {
      const clientFieldErrors = validatedFields.error.flatten().fieldErrors;
      setFieldErrors({
        username: clientFieldErrors.username ?? [],
        email: clientFieldErrors.email ?? [],
        password: clientFieldErrors.password ?? [],
      });
      return;
    }

    setFieldErrors({ username: [], email: [], password: [] });

    const res = await createUser(userData);

    setEmailExists(res?.errors?.emailExists);
    setUsernameExists(res?.errors?.usernameExists);
    setFieldErrors(
      res?.errors?.fieldErrors ?? { username: [], email: [], password: [] }
    );
    setUserCreated(Boolean(res?.success));
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
            setFieldErrors((curr) => ({ ...curr, username: [] }));
            setUsernameExists(false);
            setUsername(event.target.value);
          }}
        />
      </LabeledElement>
      {fieldErrors.username.length > 0 && (
        <div className="text-red-500" data-testid="username-invalid-text">
          {fieldErrors.username[0]}
        </div>
      )}
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
            setFieldErrors((curr) => ({ ...curr, email: [] }));
            setEmailExists(false);
            setEmail(event.target.value);
          }}
        />
      </LabeledElement>
      {fieldErrors.email.length > 0 && (
        <div className="text-red-500" data-testid="email-invalid-text">
          {fieldErrors.email[0]}
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
            setFieldErrors((curr) => ({ ...curr, password: [] }));
            setPassword(event.target.value);
          }}
        />
      </LabeledElement>
      {fieldErrors.password.length > 0 && (
        <div className="text-red-500" data-testid="password-invalid-text">
          {fieldErrors.password[0]}
        </div>
      )}
      <Button
        onClick={handleSubmit}
        disabled={
          !username ||
          !email ||
          !password ||
          hasFieldErrors ||
          emailExists ||
          usernameExists
        }
        type="primary"
        extraClasses="mt-2"
      >
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
