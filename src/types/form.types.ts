import { FieldValues, UseFormRegister } from "react-hook-form";

export type CheckboxProps = {
  name: string,
  label: string;
  image?: string;
  register: UseFormRegister<FieldValues>;
}