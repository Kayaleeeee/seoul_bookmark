import "./globals.css";
import type { Metadata } from "next";
import { Nanum_Myeongjo, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const nanum_myeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
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
      <body className={(inter.className, nanum_myeongjo.className)}>
        <div className="appWrapper">
          <div className="appContentWrapper">{children}</div>
        </div>
      </body>
    </html>
  );
}
