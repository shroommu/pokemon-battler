import Footer from "@/components/Footer";
import "./globals.css";

import Header from "@/components/Header";

export const metadata = {
  title: "Pokemon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-dvh">
      <body className="h-dvh bg-red-500">
        <Header />
        <div
          className="flex flex-none min-h-[calc(100dvh-80px)] lg:min-h-[calc(100dvh-120px)] bg-red-500"
          data-testid="content-body-container"
        >
          <div
            data-testid="screen-container"
            className="flex flex-row h-full p-4 w-full"
          >
            <div
              className="flex flex-col p-6 w-full bg-gray-200 rounded-md border-2 border-red-800 h-full shadow-[0_0_12px_0_rgba(0,0,0,0.5)_inset]"
              data-testid="screen"
            >
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
