import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextInputProps } from "../../types/form.types";
import './TextInput.css'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FieldValues } from "react-hook-form";


function TextInput<TFieldValues extends FieldValues = FieldValues>({label, name, register, validationrules, ...props}: TextInputProps<TFieldValues>) {

  const isDirty = props.dirtyfields ? props.dirtyfields[name] : false;
  const hasError = props.errors && props.errors[name];

  return (
    <fieldset className="text_input_field">
      <label className="text_input_label" htmlFor={name}>{label}{props.required && '*'}</label>
      <input id={name} {...props} {...register(name, validationrules)} className="text_input"/>
      {props.errormessages && props.errormessages.map((msg: string) => <span key={msg} className={hasError ? "fail" : !isDirty ? '' : 'success'}><FontAwesomeIcon icon={faCheck}/>{msg}</span>)}
      </fieldset>
  )
}

export default TextInput;