import "./Checkbox.css";
import { CheckboxProps } from "../../types/form.types";

/**
 * Checkbox component handles both possible
 * variations (Filtering, Filtering with image)
 *
 * image propery is optional, rest are mendatory
 */

function Checkbox({name, label, image, register}: CheckboxProps) {
  return <fieldset className="checkbox_field">
    <input type="checkbox" className="checkbox_input" {...register(name)}/>
    <label className="checkbox_label">
      {image &&
        <div className="checkbox_image_cover">
          <img src={image} className="checkbox_image"/>
        </div>
      }
      {label}</label>
  </fieldset>
}

export default Checkbox;