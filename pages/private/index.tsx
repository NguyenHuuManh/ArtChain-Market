import { useAuth } from "@/context/authorContext";
import WithAuthor from "@/hocs/WithAuthor";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
const Private = () => {
  const [controller, dispatch] = useAuth();
  const router = useRouter();
  console.log(controller, "controller");
  useEffect(() => {
    if (!controller.username) router.push("/login");
  }, []);
  return <div>Private</div>;
};

export default Private;
