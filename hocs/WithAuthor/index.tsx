/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useAuth } from "@/context/authorContext";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const WithAuthor = (Component: any) => {
  return (props: any) => {
    const [controller] = useAuth();
    const router = useRouter();
    const isAuthor = useMemo(() => controller.username, [controller]);

    useEffect(() => {
      if (!isAuthor) {
        router.push("/login");
      }
    }, []);
    return <Component {...props} />;
  };
};

export default WithAuthor;
