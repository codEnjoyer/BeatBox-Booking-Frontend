import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BeatBox Booking",
  description: "Система бронирования музыкальных студий",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={"bg-bg text-text " + inter.className}>{children}</body>
    </html>
  );
}
