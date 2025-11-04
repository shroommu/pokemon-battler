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
        <div className="flex min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-120px)] bg-red-500" data-testid="content-body-container">
          {children}
        </div>
      </body>
    </html>
  );
}
