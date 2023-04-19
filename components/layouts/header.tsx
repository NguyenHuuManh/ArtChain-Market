import { dispatchLogout, useAuth } from "@/context/authorContext";
import { memo, useMemo } from "react";
import { Button } from "reactstrap";

const Header = () => {
  const [controller, dispatch] = useAuth();
  const btnLogout = useMemo(() => {
    return (
      !!controller.username && (
        <Button onClick={() => dispatchLogout(dispatch)}>Logout</Button>
      )
    );
  }, [controller]);
  return <div>{btnLogout}</div>;
};

export default memo(Header);
