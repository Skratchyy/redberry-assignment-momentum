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
  control?: Control<TFieldValues, any>;
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
  dirtyfields?: any;
  isTextarea?: boolean;
  errormessages?: string[];
}

export interface ImageInputProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean
  register: UseFormRegister<TFieldValues>;
}

export interface DateInputProps {
  name: string;
  label?: string;
  control: any;
  required?: boolean;
}

export interface DateItem {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isDisabled?: boolean;
}