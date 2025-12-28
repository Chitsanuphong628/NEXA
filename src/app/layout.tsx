// src/app/layout.tsx
import { Noto_Sans_Thai } from "next/font/google";
import "./global.css";
const noto = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={noto.className}>{children}</body>
    </html>
  );
}
