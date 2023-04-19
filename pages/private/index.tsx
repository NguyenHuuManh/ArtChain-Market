import WithAuthor from "@/hocs/WithAuthor";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
const Private = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    if (count === 4) setTimeout(() => setText("finish"), 10000);
  }, [count]);

  return (
    <>
      <div>{text}</div>
      <div>{count}</div>
      <Button onClick={() => setCount((pre) => pre++)}>Add</Button>
    </>
  );
};

export default WithAuthor(Private);
