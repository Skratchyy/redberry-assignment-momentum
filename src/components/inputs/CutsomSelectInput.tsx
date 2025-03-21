import { useState, useRef, useEffect } from 'react';
import { FieldValues, Controller } from "react-hook-form";
import { SelectInputProps } from "../../types/form.types";
import './CustomSelect.css';

function CustomSelectInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  options,
  required,
  validationrules,
  control
}: SelectInputProps<TFieldValues>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (options && options.length > 0 && !selectedOption) {
      setSelectedOption(options[0]);
    }
  }, [options, selectedOption]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: any, onChange: any) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.id);
  };

  return (
    <fieldset className="select_input_field">
      <label className="select_input_label" htmlFor={name}>{label}{required && "*"}</label>

      <Controller
        name={name}
        control={control}
        rules={validationrules}
        render={({ field: { onChange } }) => (
          <div className="custom_select_container" ref={dropdownRef}>
            <div
              className="custom_select_trigger"
              onClick={toggleDropdown}
            >
              {selectedOption ? (
                <div className="selected_option">
                  {'avatar' in selectedOption && <img src={selectedOption.avatar} alt="" className="option_avatar" />}
                  {'icon' in selectedOption && <img src={selectedOption.icon} alt="" className="option_avatar" />}
                  <span>{selectedOption.name}</span>
                </div>
              ) : (
                <span>Select an option</span>
              )}
            </div>
            {isOpen && (
              <div className="custom_select_options">
                {options?.map((option, id) => (
                  <div
                    className={`custom_select_option ${selectedOption?.id === option.id ? 'selected' : ''}`}
                    key={id}
                    onClick={() => handleOptionSelect(option, onChange)}
                  >
                    {'avatar' in option && <img src={option.avatar} alt="" className="option_avatar" />}
                    {'icon' in option && <img src={option.icon} alt="" className="option_avatar" />}
                    <span>{option.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />
    </fieldset>
  );
}

export default CustomSelectInput;