export const nameValidation = {
  required: true,
  minLength: {
    value: 2
  },
  maxLength: {
    value: 255
  },
  pattern: {
    value: /^[a-zA-Z\u10A0-\u10FF]+$/,
    message: "მარტო ლათინური და ქართული სიმბოლოები"
  }
}

export const selectValidation = {
    required: "დეპარტამენტი სავალდებულოა",
    validate: (value: string | number | undefined) => value !== ""
}
