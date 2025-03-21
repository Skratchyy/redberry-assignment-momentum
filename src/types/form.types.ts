import { Control, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Department, Employee, Priority, Status } from "./api.types";

export interface CheckboxProps<TFieldValues extends FieldValues = FieldValues> {
  name: keyof TFieldValues & string,
  label: string;
  image?: string;
  register: UseFormRegister<FieldValues>;
  checked?: boolean;
}

export interface SelectInputProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  register?: UseFormRegister<TFieldValues>;
  control?: Control<FieldValues, any>;
  options?: Department[] | Employee[] | Status[] | Priority[];
  validationrules?: object;
  required?: boolean;
}

export type FilterProps = {
  register: UseFormRegister<FieldValues>;
  children: React.ReactNode[] | React.ReactNode;
  title: string;
  name: string;
}

export interface TextInputProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  register: UseFormRegister<TFieldValues>;
  validationrules?: object;
  errors?: Record<string, any>;
  dirtyfields?: Record<string, boolean>;
  isTextarea?: boolean;
  errormessages?: string[];
}

export interface ImageInputProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean
  register: UseFormRegister<TFieldValues>;
}