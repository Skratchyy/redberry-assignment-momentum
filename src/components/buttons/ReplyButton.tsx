import { ButtonProps } from "../../types/button.types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTurnUp } from "@fortawesome/free-solid-svg-icons"
import './buttonStyle.css';
/**
 * In this proejct I'm using FontAwesome free version
 * which unfortunately doesn't have exact same icon as in design
 *
 * So it looks a bit different but I figured it would be okay
 */

function ReplyButton({title, onClick}: ButtonProps){
  return <button onClick={onClick} className="button_reply">
    {/** Free fontawesome doesn't have exact same aarrow as in design */}
    <FontAwesomeIcon icon={faTurnUp}/>
    {title}
    </button>
}

export default ReplyButton