import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ViewProvider } from "@/components/view-context";
import { site } from "@/lib/site";
import "./globals.css";

// 中文字型檔很大，不預先載入，由瀏覽器依用到的字分段下載
const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  weight: ["400", "500", "700"],
  preload: false,
  display: "swap",
});

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  weight: ["500", "700"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name}｜${site.title}`,
    template: `%s｜${site.name}`,
  },
  description: site.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant-TW" className={`${notoSans.variable} ${notoSerif.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <ViewProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ViewProvider>
      </body>
    </html>
  );
}
