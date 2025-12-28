// src/app/layout.tsx
import { Noto_Sans_Thai } from "next/font/google";
<<<<<<< HEAD
import "./global.css";
=======

>>>>>>> 6929679fe6c97bbec07cbf5cda0dbb08754215eb
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
