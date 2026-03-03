import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meta Verified – Official Account Verification",
  description: "Get the blue verification badge, dedicated support, and exclusive benefits on Facebook and Instagram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
