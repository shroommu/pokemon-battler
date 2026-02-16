jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/app/api/auth/[...nextauth]", () => ({
  authOptions: { providers: [] },
}));

import SettingsPage from ".././page";
import { getServerSession } from "next-auth";

describe("SettingsPage", () => {
  it("renders session JSON", async () => {
    getServerSession.mockResolvedValueOnce({ user: { id: "1" } });

    const element = await SettingsPage();

    expect(getServerSession).toHaveBeenCalledTimes(1);
    expect(element.props.children).toBe('{"user":{"id":"1"}}');
  });
});
