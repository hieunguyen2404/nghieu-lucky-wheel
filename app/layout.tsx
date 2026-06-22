import "@/styles/globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vòng quay may mắn",
  description: "Lucky Wheel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
