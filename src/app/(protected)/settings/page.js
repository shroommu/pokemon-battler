import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  return <div data-testid="settings-page">{JSON.stringify(session)}</div>;
};

export default SettingsPage;
