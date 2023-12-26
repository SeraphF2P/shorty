"use client";
import { useViewportSize } from "@mantine/hooks";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { toast } from "react-toastify";
import { mutate } from "swr";
import * as yup from "yup";
import { CreateShortLinkSchema } from "../lib/yupSchema";
import Btn from "./Btn";
type CreateShortLinkFormType = yup.InferType<typeof CreateShortLinkSchema>;
export default function ShortenLink() {
  const submitHandeler = async (
    values: CreateShortLinkFormType,
    { setSubmitting }: { setSubmitting: (val: boolean) => void }
  ) => {
    setSubmitting(true);
    await axios
      .post("/api/shortener", {
        link: values.link,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
          mutate(`/api/shortenlinks`);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        console.error(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const { width: vWidth } = useViewportSize();

  return (
    <>
      <section className="  bg-shorten-link relative  mx-auto flex flex-col items-center justify-center xs:px-16 sm:px-24 md:px-8 ">
        <Formik
          initialValues={{ link: "" }}
          validationSchema={CreateShortLinkSchema}
          onSubmit={submitHandeler}
        >
          {({ isSubmitting, setFieldValue, submitForm }) => {
            return (
              <Form className=" container relative mx-4 flex w-full flex-col gap-6 p-8 xs:mx-8 xs:flex-row  xs:items-center ">
                {vWidth > 768 ? (
                  <Image
                    className="   rounded bg-dark-violet"
                    src={"/images/bg-boost-desktop.svg"}
                    sizes="600px 100px"
                    fill
                    alt="background"
                  />
                ) : (
                  <Image
                    className="   rounded bg-dark-violet"
                    src={"/images/bg-shorten-mobile.svg"}
                    fill
                    sizes="300px 250px"
                    alt="background"
                  />
                )}

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
