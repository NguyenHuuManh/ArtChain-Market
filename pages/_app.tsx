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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthorProvider>
      <WalletProvider>
        <div style={{ position: 'relative' }}>
          <AddNFT />
          <Header />
          <Component {...pageProps} />
          {/* <Footer /> */}
          <ScollTop />
        </div>
      </WalletProvider>
    </AuthorProvider>
  );
}
