export const nameValidation = {
  required: true,
  minLength: {
    value: 2
  },
  maxLength: {
    value: 255
  },
  pattern: {
    value: /^(?=.*\S)([a-zA-Z\u10A0-\u10FF\s]+)$/,
    message: "მარტო ლათინური და ქართული სიმბოლოები"
  }
}

export const titleValidation = {
  required: true,
  minLength: {
    value: 3
  },
  maxLength: {
    value: 255
  },
}

export const descriptionValidation = {
  required: true,
  minLength: {
    value: 4
  },
  maxLength: {
    value: 255
  }
}

export const selectValidation = {
    required: "დეპარტამენტი სავალდებულოა",
    validate: (value: string | number | undefined) => value !== ""
}
