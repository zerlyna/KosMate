import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KosMate - Rekomendasi Kos Terbaik",
  description: "Temukan kos terbaik di sekitar PENS sesuai preferensi kamu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}