import { Field } from "formik";
import React from "react";
import { InputFieldI } from "./InputField";

interface AppFieldI extends Omit<InputFieldI, "form"> {
  name: string;
  component: React.JSXElementConstructor<any>;
}
const AppField = (props: AppFieldI) => {
  return <Field {...props} />;
};

export default AppField;
