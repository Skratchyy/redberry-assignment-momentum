import { FieldValues, UseFormRegister } from "react-hook-form";

export interface CheckboxProps {
  name: string,
  label: string;
  image?: string;
  register: UseFormRegister<FieldValues>;
  checked?: boolean;
}

export type FilterProps = {
  register: UseFormRegister<FieldValues>;
  children: React.ReactNode[] | React.ReactNode;
  title: string;
  name: string;
}

export interface TextInputProps {
  name: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  validationrules?: object;
  errors?: Record<string, any>;
  dirtyfields?: Record<string, boolean>;
  errormessages?: string[];
}