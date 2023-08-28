import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import ScollTop from "@/components/layouts/scrollTop";
import AuthorProvider from "@/context/authorContext";
import WalletProvider from "@/context/walletContext";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { AppProps } from "next/app";
import AddNFT from "@/components/layouts/AddNFT";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const starCount = 45; // Number of stars to create
    const shootingStarInterval = 8000; // Interval between shooting stars in milliseconds

    function createStar() {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      document.getElementById("stars").appendChild(star);
    }

    function createShootingStar() {
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      shootingStar.style.top = `${Math.random() * 100}%`;
      shootingStar.style.left = `${Math.random() * 100}%`;
      document.body.appendChild(shootingStar);
      setTimeout(() => {
        document.body.removeChild(shootingStar);
      }, 3000);
    }

    function generateStars() {
      for (let i = 0; i < starCount; i++) {
        createStar();
      }
    }

    generateStars();
    setTimeout(createShootingStar, Math.random() * shootingStarInterval); // Initial shooting star

    // Randomize shooting star interval
    function randomizeShootingStarInterval() {
      const interval = Math.random() * shootingStarInterval;
      setTimeout(function () {
        createShootingStar();
        randomizeShootingStarInterval();
      }, interval);
    }

    randomizeShootingStarInterval();

  }, [])
  return (
    <AuthorProvider>
      <WalletProvider>
        <div style={{ position: 'relative' }}>
          <Header />
          <Component {...pageProps} />
          {/* <Footer /> */}
          <ScollTop />
        </div>
      </WalletProvider>
    </AuthorProvider>
  );
}
