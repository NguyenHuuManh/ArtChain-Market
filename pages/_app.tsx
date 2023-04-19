import Header from "@/components/layouts/header";
import AuthorProvider from "@/context/authorContext";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthorProvider>
      <Header />
      <Component {...pageProps} />
    </AuthorProvider>
  );
}
