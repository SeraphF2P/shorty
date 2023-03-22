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
export default ({ children }: Props) => {
  const [isLoginOpen, setIsloginOpen] = useState(false);
  const [isLogOutOpen, setIsLogOutOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  // const { getGeneratedLinks } = useGeneratedLinksCotext();

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
    { setSubmitting }: { setSubmitting: (val: boolean) => void }
  ) => {
    try {
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
            // getGeneratedLinks();
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
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={submitHandeler}
        >
          {({ isSubmitting }) => {
            return (
              <Form className=" fixed top-0 left-[-10%] z-40 grid h-screen   w-[120%] bg-grayish/40  backdrop-blur-sm">
                <Dialog.Panel className=" m-auto  flex animate-fadeUp flex-col items-center justify-center gap-5  rounded bg-white py-8 px-4 ">
                  <Dialog.Title>
                    {isLoginOpen ? "Login" : "Sign Up"}
                  </Dialog.Title>
                  <div className=" relative">
                    <Field
                      name="email"
                      type="text"
                      placeholder="email"
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
