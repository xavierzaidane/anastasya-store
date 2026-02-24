'use client';

import Footer from "@/components/navigations/Footer";
import LandingPage from "./landing/page";
import StoreNavbar from "@/components/navigations/StoreNavbar";

export default function Home() {
  return (
    <>
    <StoreNavbar />
    <div className="w-full overflow-hidden">
      <main>
        <LandingPage />
      </main>
      <div className="h-5" />
      <Footer />
    </div></>
  );
}
