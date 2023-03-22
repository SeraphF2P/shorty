"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  Fragment,
} from "react";
import { Dialog } from "@headlessui/react";
import Btn from "../../components/Btn";
import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const Regester = createContext<{
  setIsloginOpen: Dispatch<SetStateAction<boolean>>;
  setIsSignUpOpen: Dispatch<SetStateAction<boolean>>;
}>({
  setIsloginOpen: () => {},
  setIsSignUpOpen: () => {},
});

export const useRegesterCotext = () => {
  return useContext(Regester);
};

export default (props: { children: ReactNode }) => {
  const [isLoginOpen, setIsloginOpen] = useState(true);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Please add a link"),
    password: Yup.string()
      .min(6, "Password can't be less than 6 characters")
      .max(12, "Password can't be more than 12 characters")
      .required("Password is Required"),
  });
  type Data = { email: string; password: string };
  const submitHandeler = async (
    { email, password }: Data,
    { setStatus, setSubmitting }
  ) => {
    try {
      setSubmitting(true);
      const res = await axios
        .post("http://localhost:3000/api/regester", {
          data: { email, password },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .finally(() => {
          setSubmitting(false);
        });
      setStatus(200);
    } catch {
      toast.error("error");
    }
  };
  return (
    <Regester.Provider value={{ setIsloginOpen, setIsSignUpOpen }}>
      {props.children}
      <Dialog
        as={Fragment}
        open={isLoginOpen || isSignUpOpen}
        onClose={() => {
          setIsloginOpen(false);
          setIsSignUpOpen(false);
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={submitHandeler}
          b
        >
          {() => {
            return (
              <Form className=" fixed top-0 left-[-10%] z-40 grid h-screen   w-[120%] bg-grayish/40  backdrop-blur-sm">
                <Dialog.Panel className=" m-auto  flex animate-fadeUp flex-col items-center justify-center gap-5  rounded bg-white py-8 px-4 ">
                  <Dialog.Title>
                    {isLoginOpen ? "Login" : "Sign Up"}
                  </Dialog.Title>
                  <div className=" relative">
                    <Field
                      id="signUpEmail"
                      name="email"
                      type="text"
                      placeholder="email"
                      className="form-field"
                    />
                    <label htmlFor="signUpEmail" className=" sr-only">
                      enter an email for sign up
                    </label>
                    <ErrorMessage
                      className=" form-error"
                      name="email"
                      component="div"
                    />
                  </div>
                  <div className=" relative">
                    <Field
                      id="signUpEmail"
                      name="password"
                      type="password"
                      placeholder="password"
                      className="form-field"
                    />
                    <label htmlFor="signUppassword" className=" sr-only">
                      enter an password for sign up
                    </label>
                    <ErrorMessage
                      className=" form-error"
                      name="password"
                      component="div"
                    />
                  </div>
                  <div className=" flex w-full justify-between">
                    <Btn
                      shape="filled"
                      className=" rounded-sm px-4 py-2"
                      onClick={() => setIsloginOpen(false)}
                    >
                      close
                    </Btn>
                    <Btn
                      shape="filled"
                      type="submit"
                      className=" rounded-sm px-4 py-2"
                    >
                      submit
                    </Btn>
                  </div>
                </Dialog.Panel>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </Regester.Provider>
  );
};
