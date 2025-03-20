import { DateProps } from "../../../types/card.types";
import './cardComponentsStyle.css'
function DateField({date}: DateProps) {
  const day = date.getDay()
  const month = date.getMonth()
  const year = date.getFullYear();

  const geoMonthNames = [
    'იანვ', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ',
    'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'
  ];

  return <p className="fate_field">{`${day} ${geoMonthNames[month]}, ${year}`}</p>
}

export default DateField;