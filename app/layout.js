import React from "react";
import Navbar from "./_components/Navbar";
import Logo from "./_components/Logo";
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

console.log("josefin: ", josefin.className);

import "@/app/_styles/globals.css";
import "react-day-picker/dist/style.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  //title: "The wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description: "The Wild Oasis is a place to relax and enjoy nature.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 min-h-screen text-primary-100 ${josefin.className} antialiased flex flex-col relative`}
      >
        <Header />
        <div className=" flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
            {children}
            </ReservationProvider>
            </main>
        </div>

        <footer>CopyRight Debbie Zuleta</footer>
      </body>
    </html>
  );
}
