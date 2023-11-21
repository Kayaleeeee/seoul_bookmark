import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const noto_sans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "책 읽는 서울 | 서울 북마크",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={(inter.className, noto_sans.className)}>
        <div className="appWrapper justify-center inline-flex">
          <div className="appContentWrapper">{children}</div>
        </div>
      </body>
    </html>
  );
}
