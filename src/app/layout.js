import "./globals.css";

import Header from "@/components/Header";

export const metadata = {
  title: "Pokemon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-dvh">
      <body className="h-dvh">
        <Header />
        <div
          className="flex h-auto bg-red-500"
          data-testid="content-body-container"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
