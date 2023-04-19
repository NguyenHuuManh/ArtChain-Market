import { FieldProps } from "formik";
import { FormGroup, Input, InputProps, Label } from "reactstrap";

type UnionType = InputProps & FieldProps;
export interface InputFieldI extends UnionType {
  label: string;
}
const InputField = ({ field, ...props }: InputFieldI) => {
  return (
    <FormGroup>
      <Label for="exampleEmail">Email</Label>
      <Input {...field} {...props} />
    </FormGroup>
  );
};

export default InputField;
