import { ButtonProps } from "../../types/button.types"
import './buttonStyle.css';
function FilterButton({title, onClick, type}: ButtonProps){
  return <button  type={type ? type : "button"} onClick={onClick} className="button_filter">{title}</button>
}

export default FilterButton