import { FieldValues } from "react-hook-form"
import { SelectInputProps } from "../../types/form.types"
import './SelectInput.css'
function SelectInput<TFieldValues extends FieldValues = FieldValues>({name, label, register, options, required, validationrules}: SelectInputProps<TFieldValues>) {
  return <fieldset className="select_input_field">
  <label className="select_input_label" htmlFor="name">{label}{required && "*"}</label>
  <select className="select_input" {...register(name, validationrules)}>
    <option value=""></option>
    {options?.map((option, id) => <option key={id} value={option.id}>{option.name}</option>)}
  </select>
  </fieldset>
}

export default SelectInput