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