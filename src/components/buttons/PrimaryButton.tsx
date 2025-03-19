import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonProps } from "../../types/button.types"
import './buttonStyle.css';
function PrimaryButton({title, onClick}: ButtonProps){
  return <button onClick={onClick} className="button_primary">
    <FontAwesomeIcon icon={faPlus} />
    {title}
    </button>
}

export default PrimaryButton