import * as yup from 'yup'
export const SignUpSchema = yup.object({
  username: yup.string().min(3).max(30).required("user name is required"),
  password: yup.string()
    .min(6, "Password can't be less than 6 characters")
    .max(12, "Password can't be more than 12 characters")
    .required("Password is Required"),
  password_Confirmation: yup.string()
    .min(6, "Password can't be less than 6 characters")
    .max(12, "Password can't be more than 12 characters")
    .required("Password is Required").test({
      test: function (value) {
        return value === this.parent.password;
      },
      message: "Passwords do not match"
    }),

})
export const LoginSchema = yup.object({
  username: yup.string().min(3).max(30).required("user name is required"),
  password: yup.string()
    .min(6, "Password can't be less than 6 characters")
    .max(12, "Password can't be more than 12 characters")
    .required("Password is Required"),
})
export const CreateShortLinkSchema = yup.object({
  link: yup.string()
    .url("Please enter a valid URL")
    .required("Please add a link"),
});