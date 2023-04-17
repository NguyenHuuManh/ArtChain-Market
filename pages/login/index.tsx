import { useAuth } from "@/context/authorContext";
import { dispatchLogin } from "@/context/authorContext";
import { useRouter } from "next/router";
import React from "react";
import { Card, FormGroup, Label, Input, Form, CardBody } from "reactstrap";
const Login = () => {
  const [controller, dispatch] = useAuth();
  const route = useRouter();
  const onSubmit = () => {
    dispatchLogin(dispatch, { username: "0343700317", password: "123aA@" });
    route.push("/");
  };
  return (
    // <div className="card">
    <Card
      title="Login"
      style={{ width: "18rem", margin: "auto", marginTop: "1rem" }}
    >
      <CardBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </FormGroup>
          <FormGroup>
            <Input type="submit" value={"login"} onClick={onSubmit} />
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
    // </div>
  );
};

export default Login;
