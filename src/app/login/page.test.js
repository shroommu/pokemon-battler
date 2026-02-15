import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LogInPage from "./page";
import { login } from "@/actions/login";

jest.mock("@/actions/login", () => ({
  login: jest.fn(),
}));

describe("LogInPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows field validation error when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<LogInPage />);

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(
      screen.getByText("Please enter both username and password.")
    ).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });

  it("shows authentication error returned by server action", async () => {
    login.mockResolvedValue({ error: "Invalid credentials" });

    const user = userEvent.setup();
    render(<LogInPage />);

    await user.type(screen.getByTestId("login-username-input"), "misty");
    await user.type(screen.getByTestId("login-password-input"), "wrongpass");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });
});
