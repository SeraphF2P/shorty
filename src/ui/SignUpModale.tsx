"use client";
import { SignUpSchema } from "../lib/yupSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Btn from "./Btn";
type SignUpFormType = yup.InferType<typeof SignUpSchema>;
import { BtnProps } from "./Btn";
import Modale from "./Modale";

export default ({ ...props }: BtnProps) => {
  const submitHandeler = async (
    values: SignUpFormType,
    { setSubmitting }: { setSubmitting: (val: boolean) => void }
  ) => {
    console.log(values);
    try {
      setSubmitting(true);
      const res = await axios.post("/api/signUp", values).finally(() => {
        setSubmitting(false);
      });
      console.log(res);
      if (res.status !== 200) return toast.error(res.data.msg);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error("somthing went wrong");
      console.error(err);
      setSubmitting(false);
    }
  };
  return (
    <Modale>
      <Modale.Btn {...props} />
      <Modale.Content>
        <Formik
          initialValues={{
            username: "",
            password: "",
            password_Confirmation: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={submitHandeler}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <section className=" m-auto  flex  flex-col items-center justify-center gap-4  rounded bg-white p-4 shadow ">
                  <Modale.Title>Sign Up</Modale.Title>
                  <div className=" relative">
                    <Field
                      name="username"
                      type="text"
                      placeholder="username"
                      className="form-field"
                      autoComplete="true"
                    />
                    <label className=" sr-only">enter an email</label>
                    <ErrorMessage
                      className=" form-error"
                      name="username"
                      component="div"
                    />
                  </div>
                  <div className=" relative">
                    <Field
                      name="password"
                      type="password"
                      placeholder="password"
                      className="form-field"
                      autoComplete="true"
                    />
                    <label className=" sr-only">enter an password</label>
                    <ErrorMessage
                      className=" form-error"
                      name="password"
                      component="div"
                    />
                  </div>
                  <div className=" relative">
                    <Field
                      name="password_Confirmation"
                      type="password"
                      placeholder="confirm password"
                      className="form-field"
                      autoComplete="true"
                    />
                    <label className=" sr-only">enter an password</label>
                    <ErrorMessage
                      className=" form-error"
                      name="password_Confirmation"
                      component="div"
                    />
                  </div>
                  <div className=" flex w-full justify-between pt-4">
                    <Modale.Close variant="ghost">close</Modale.Close>
                    <Btn
                      type="submit"
                      className=" rounded-sm px-4 py-2"
                      disabled={isSubmitting}
                    >
                      submit
                    </Btn>
                  </div>
                </section>
              </Form>
            );
          }}
        </Formik>
      </Modale.Content>
    </Modale>
  );
};
