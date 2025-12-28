import type { Metadata } from "next";

import "./globals.css";
import Provider from "@/Provider";



export const metadata: Metadata = {
  title: "Grocery Delivery App",
  description: "A simple grocery delivery application  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" w-full bg-linear-to-b from-green-50 to-white min-h-screen"
        
      >
       <Provider>
        {children}
       </Provider>
      </body>
    </html>
  );
}
