import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpPage from "./page";
import { createUser } from "@/actions/createUser";

jest.mock("@/actions/createUser", () => ({
  createUser: jest.fn(),
}));

describe("SignUpPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows schema validation errors and does not submit when fields are invalid", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    await user.type(screen.getByTestId("signup-username-input"), "ab");
    await user.type(screen.getByTestId("signup-email-input"), "not-an-email");
    await user.type(screen.getByTestId("signup-password-input"), "short");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(screen.getByTestId("username-invalid-text")).toBeInTheDocument();
    expect(screen.getByTestId("email-invalid-text")).toBeInTheDocument();
    expect(screen.getByTestId("password-invalid-text")).toBeInTheDocument();
    expect(createUser).not.toHaveBeenCalled();
  });

  it("shows duplicate field errors returned by the server action", async () => {
    createUser.mockResolvedValue({
      errors: {
        usernameExists: true,
        emailExists: true,
        fieldErrors: { username: [], email: [], password: [] },
      },
      success: false,
    });

    const user = userEvent.setup();
    render(<SignUpPage />);

    await user.type(screen.getByTestId("signup-username-input"), "valid_user");
    await user.type(screen.getByTestId("signup-email-input"), "valid@test.com");
    await user.type(screen.getByTestId("signup-password-input"), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByTestId("username-exists-text")).toBeInTheDocument();
    expect(screen.getByTestId("email-exists-text")).toBeInTheDocument();
  });

  it("shows a success message when account creation succeeds", async () => {
    createUser.mockResolvedValue({ success: true, errors: {} });

    const user = userEvent.setup();
    render(<SignUpPage />);

    await user.type(screen.getByTestId("signup-username-input"), "valid_user");
    await user.type(screen.getByTestId("signup-email-input"), "valid@test.com");
    await user.type(screen.getByTestId("signup-password-input"), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledTimes(1);
    });
    expect(
      screen.getByText(/Account created successfully!/i)
    ).toBeInTheDocument();
  });
});
