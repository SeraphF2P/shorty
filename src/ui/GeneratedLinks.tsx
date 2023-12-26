"use client";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import axios from "axios";
import CopyBtn from "./CopyBtn";
import { toast } from "react-toastify";

type generatedLinksType = [{ link: string; shortLink: string }] | null;
const getGeneratedLinks = async (apiEndPoint: string) => {
  const token = localStorage.getItem("token");
  if (token === null) return null;

  return await axios
    .post(apiEndPoint, { token })
    .then((res) => {
      return res.data.generatedLinks;
    })
    .catch((err) => {
      console.error(err);
      toast.error(err.response.data.msg);
    });
};
export default () => {
  const { data }: { data: generatedLinksType } = useSWR(
    `/api/shortenlinks`,
    getGeneratedLinks,
    { suspense: true }
  );

  return (
    <section className=" relative   max-h-[292px] w-full  overflow-y-scroll  bg-gray/20 py-4  xs:px-16 sm:px-24 md:px-8">
      <div className="container mx-auto  flex  flex-col gap-4 ">
        {data &&
          data.map(({ link, shortLink }) => {
            return (
              <div
                key={shortLink}
                className="   flex flex-col justify-between rounded bg-white p-4 shadow-sm   xs:flex-row"
              >
                <p className="   prose truncate">{link}</p>
                <hr className=" mx-2 text-gray xs:mx-4" />
                <div className=" flex flex-col gap-4  xs:flex-row ">
                  <Link
                    target="_blank"
                    href={"/" + shortLink}
                    className="p-2 text-cyan  "
                  >
                    {shortLink}
                  </Link>
                  <CopyBtn shortLink={shortLink} />
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};
