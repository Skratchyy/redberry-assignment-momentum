import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../Filter.css"
import { FilterProps } from "../../../types/form.types"
import FilterButton from "../../buttons/FilterButton";


function FilterComponent({register, children, title, name}: FilterProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // I am doing this here to avoid closing modal before submitting
  function handleClick(): void {
    setTimeout(() => {
      setIsOpen(false)
    },0)
  }

  return(
      <li className="filter_container" {...register(name)}>
      <button onClick={() => setIsOpen(prev => !prev)}
      className={`filter_cta ${isOpen ? 'active' : ''}`} type="button">
        {title}
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      {isOpen &&
      <>
      <div className="filterModal-overlay" onClick={() => setIsOpen(false)}>
      </div>
        <div className="filterModal">
            {children}
            <FilterButton title="არჩევა" type={'submit'} onClick={handleClick}/>
        </div>
      </>
      }
      </li>
  )
}

export default FilterComponent;