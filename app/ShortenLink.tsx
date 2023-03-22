"use client";
import { Field, Form, ErrorMessage, Formik } from "formik";
import Image from "next/image";
import Btn from "../components/Btn";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import  { mutate } from "swr";
export default function ShortenLink() {
  const validationSchema = Yup.object().shape({
    link: Yup.string()
      .url("Please enter a valid URL")
      .required("Please add a link"),
  });
  const submitHandeler = async (
    values: any,
    { setSubmitting }: { setSubmitting: (val: boolean) => void }
  ) => {
    setSubmitting(true);
    const res = await axios
      .post("/api/shortener", {
        link: values.link,
        token: localStorage.getItem("token"),
      })
      .finally(() => {
        setSubmitting(false);
      });
    if (res.data.success === 1) {
      toast.success(res.data.msg);
      mutate(`/api/shortenlinks`);
    } else {
      toast.error(res.data.msg);
    }
  };

  return (
    <>
      <section className="  bg-shorten-link relative  mx-auto flex flex-col items-center justify-center lg:px-20 ">
        <Formik
          initialValues={{ link: "" }}
          validationSchema={validationSchema}
          onSubmit={submitHandeler}
        >
          {({ isSubmitting, setFieldValue, submitForm }) => {
            return (
              <Form className=" container relative mx-4 flex w-full flex-col gap-6 p-8 xsm:mx-8 xsm:flex-row  xsm:items-center ">
                <Image
                  className="   rounded bg-dark-violet"
                  src={
                    window.innerWidth > 768
                      ? "/images/bg-shorten-desktop.svg"
                      : "/images/bg-shorten-mobile.svg"
                  }
                  fill
                  alt="background"
                />

                <div className=" relative w-full">
                  <Field
                    className=" w-full  rounded placeholder-gray shadow focus:ring-2   invalid:focus:!ring-red"
                    id="shortenInput"
                    type="text"
                    name="link"
                    placeholder="shorten a link here"
                  />
                  <ErrorMessage
                    component="div"
                    name="link"
                    className=" form-error"
                  />
                  <label className=" sr-only" htmlFor="shortenInput">
                    shorten a link here
                  </label>
                </div>
                <Btn
                  disabled={isSubmitting}
                  type="submit"
                  shape="filled"
                  className=" relative whitespace-nowrap rounded-sm px-4 py-2 "
                  onClick={() => {
                    submitForm().finally(() => {
                      setFieldValue("link", "");
                    });
                  }}
                >
                  shorten it
                </Btn>
              </Form>
            );
          }}
        </Formik>
      </section>
    </>
  );
}
