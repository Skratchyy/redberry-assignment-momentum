import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonProps } from "../../types/button.types"
import './buttonStyle.css';
function PrimaryButton({title, onClick, icon = true, disabled}: ButtonProps){
  return <button onClick={onClick} className="button_primary" disabled={disabled}>
    {icon && <FontAwesomeIcon icon={faPlus} />}
    {title}
    </button>
}

export default PrimaryButton