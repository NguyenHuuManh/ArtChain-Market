/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useAuth } from "@/context/authorContext";
import helper from "@/helper";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";

const WithAuthor = (Component: any) => {
  return (props: any) => {
    const [controller] = useAuth();
    const router = useRouter();

    useEffect(() => {
      const AUTH_SESSION = helper.getAuthSession();
      const isAuthor = !!controller.username || AUTH_SESSION;
      if (!isAuthor) {
        router.push("/login");
      }
    }, []);
    return <Component {...props} />;
  };
};

export default WithAuthor;
