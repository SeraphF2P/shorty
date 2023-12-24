import * as yup from 'yup'
export const SignUpSchema = yup.object().shape({
  username: yup.string().min(3).max(30).required("Please add a link"),
  password: yup.string()
    .min(6, "Password can't be less than 6 characters")
    .max(12, "Password can't be more than 12 characters")
    .required("Password is Required"),
  password_Confirmation: yup.string()
    .min(6, "Password can't be less than 6 characters")
    .max(12, "Password can't be more than 12 characters")
    .required("Password is Required"),
}).test({
  test: ({ password, password_Confirmation }) => {
    return password === password_Confirmation
  },
  message: "password dose not match"
});