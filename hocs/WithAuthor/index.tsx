import { useRouter } from "next/router";
import { useEffect } from "react";

const WithAuthor = ({ Component, pageProps }: any) => {
  const isAuthor = false;
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthor) {
  //     router.push("/login");
  //   }
  // }, []);

  return <Component {...pageProps} />;
};

export default WithAuthor;
