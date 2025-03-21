import { useState } from "react";
import imageLogo from "../../assets/image.png";
import trashLogo from "../../assets/trash.svg";
import "./ImageInput.css";
import { ImageInputProps } from "../../types/form.types";
import { FieldValues } from "react-hook-form";

function ImageInput<TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  required,
  register,
}: ImageInputProps<TFieldValues>) {
  const [preview, setPreview] = useState<string | null>(null);
  const { onChange, ref, ...rest } = register(name, {
    required: "ფოტო აუცილებელია",
    validate: {
      lessThan10MB: (files) => files[0]?.size < 5000000 || "მაქსიმუმ 500kb",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setPreview(null);
    const fileInput = document.querySelector(
      `input[name="${name}"]`
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <fieldset className="input_image_field">
      <label htmlFor={name.toString()} className="input_image_label">
        {label}
        {required && "*"}
      </label>
      <div className="image_upload_container">
        {!preview ? (
          <label htmlFor={name.toString()} className="image_upload_placeholder">
            <div className="image_icon_wrapper">
              <img src={imageLogo} alt="Upload" className="image_upload_icon" />
              <span className="upload_text">ატვირთე ფოტო</span>
            </div>
            <input
              type="file"
              id={name.toString()}
              className="input_image"
              accept="image/*"
              onChange={handleInputChange}
              ref={ref}
              {...rest}
            />
          </label>
        ) : (
          <div className="image_preview_container">
            <img src={preview} alt="Preview" className="image_preview" />
            <button
              type="button"
              className="delete_image_button"
              onClick={handleDeleteImage}
            >
              <img src={trashLogo} alt="Delete" className="delete_icon" />
            </button>
          </div>
        )}
      </div>
    </fieldset>
  );
}

export default ImageInput;
