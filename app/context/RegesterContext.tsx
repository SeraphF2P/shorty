"use client";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  createContext,
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import Btn from "../components/Btn";
import { SignUpSchema } from "../lib/yupSchema";

const Regester = createContext<{
  setIsloginOpen: Dispatch<SetStateAction<boolean>>;
  setIsSignUpOpen: Dispatch<SetStateAction<boolean>>;
  setIsLogOutOpen: Dispatch<SetStateAction<boolean>>;
}>({
  setIsloginOpen: () => {},
  setIsSignUpOpen: () => {},
  setIsLogOutOpen: () => {},
});

export const useRegesterCotext = () => {
  return useContext(Regester);
};

type Props = { children: ReactNode };
type Data = { email: string; password: string };

export default ({ children }: Props) => {
  const [isLoginOpen, setIsloginOpen] = useState(false);
  const [isLogOutOpen, setIsLogOutOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const submitHandeler = async (
    { email, password }: Data,
    { setSubmitting }: { setSubmitting: (val: boolean) => void }
  ) => {
    try {
      if (typeof window === "undefined") return;
      setSubmitting(true);
      if (isSignUpOpen) {
        const res = await axios
          .post("/api/signUp", {
            email,
            password,
          })
          .finally(() => {
            setSubmitting(false);
            setIsSignUpOpen(false);
          });
        if (res.status === 200) {
          if (res.data.success === 1) {
            localStorage.setItem("token", res.data.token);
            toast.success(res.data.msg);
          } else if (res.data.success === 0) {
            toast.error(res.data.msg);
          }
        }
      }
      if (isLoginOpen) {
        const res = await axios
          .post("/api/login", {
            email,
            password,
          })
          .finally(() => {
            setSubmitting(false);
            setIsloginOpen(false);
          });

        if (res.status === 200) {
          if (res.data.success === 1) {
            localStorage.setItem("token", res.data.token);
            toast.success(res.data.msg);
          } else if (res.data.success === 0) {
            toast.error(res.data.msg);
          }
        }
      }
    } catch (err) {
      toast.error("somthing went wrong");
      console.log(err);
      setSubmitting(false);
    }
  };

  return (
    <Regester.Provider
      value={{ setIsloginOpen, setIsSignUpOpen, setIsLogOutOpen }}
    >
      {children}

      <Dialog
        as={Fragment}
        open={isLoginOpen || isSignUpOpen}
        onClose={() => {
          setIsloginOpen(false);
          setIsSignUpOpen(false);
        }}
      >
        <Formik
          initialValues={{ email: "", password: "", password_Confirmation: "" }}
          validationSchema={SignUpSchema}
          onSubmit={submitHandeler}
        >
          {({ isSubmitting }) => {
            return (
              <Form className=" fixed top-0 left-[-10%] z-40 grid h-screen   w-[120%] bg-grayish/40  backdrop-blur-sm">
                <Dialog.Panel className=" m-auto  flex animate-fadeUp flex-col items-center justify-center gap-5  rounded bg-white py-8 px-4 ">
                  <Dialog.Title>Sign Up</Dialog.Title>
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
                      name="email"
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
                      name="password"
                      component="div"
                    />
                  </div>
                  <div className=" flex w-full justify-between">
                    <Btn
                      shape="filled"
                      className=" rounded-sm px-4 py-2"
                      onClick={() => {
                        setIsloginOpen(false);
                        setIsSignUpOpen(false);
                      }}
                    >
                      close
                    </Btn>
                    <Btn
                      shape="filled"
                      type="submit"
                      className=" rounded-sm px-4 py-2"
                      disabled={isSubmitting}
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
      <Dialog
        as={Fragment}
        open={isLogOutOpen}
        onClose={() => setIsLogOutOpen(false)}
      >
        <section className=" fixed top-0 left-[-10%] z-40 grid h-screen   w-[120%] bg-grayish/40  backdrop-blur-sm">
          <Dialog.Panel className=" prose m-auto  flex animate-fadeUp flex-col items-center justify-center gap-5  rounded bg-white py-8 px-4 ">
            <Dialog.Title>Log out</Dialog.Title>
            <Dialog.Description>
              are you sure you want to log out?
            </Dialog.Description>
            <div className=" flex w-full items-center justify-center  gap-8">
              <Btn
                shape="outlined"
                className=" rounded-sm px-4 py-2 !text-very-dark-blue"
                onClick={() => setIsLogOutOpen(false)}
              >
                Cancel
              </Btn>
              <Btn
                shape="filled"
                className="rounded-sm bg-red px-4 py-2 hover:bg-red/80 hover:text-very-dark-blue/90 active:bg-red/90 active:text-very-dark-blue/90"
                onClick={() => {
                  {
                    if (typeof window === "undefined") return;
                    localStorage.removeItem("token");
                    setIsLogOutOpen(false);
                  }
                }}
              >
                Confirm
              </Btn>
            </div>
          </Dialog.Panel>
        </section>
      </Dialog>
    </Regester.Provider>
  );
};
