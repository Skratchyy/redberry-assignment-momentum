import { ButtonProps } from "../../types/button.types"
import './buttonStyle.css'

function SecondaryButton({title, onClick}: ButtonProps){
  return <button onClick={onClick} className="button_secondary">{title}</button>
}

export default SecondaryButton