import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ADLaM_Display, Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import { SavedItemsProvider } from "@/hooks/use-saved-items";
import ConditionalFooter from "@/components/navigations/ConditionalFooter";
import ScrollToTop from "@/components/common/ScrollToTop";

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = ADLaM_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});


export const metadata: Metadata = {
  title: "Anastasya Store",
  description: "Welcome to Anastasya Store, a curated selection of unique and stylish items. Explore our collection and find your next treasure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}>
        <ClerkProvider>
          <SavedItemsProvider>
            <ScrollToTop />
            {children}
            <ConditionalFooter />
          </SavedItemsProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}