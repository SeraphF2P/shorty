"use client";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import axios from "axios";
import CopyBtn from "./CopyBtn";

type generatedLinksType = [{ link: string; shortLink: string }] | null;
const getGeneratedLinks = async (apiEndPoint: string) => {
  if (localStorage.getItem("token") == null) return null;
  const res = await axios.post(apiEndPoint, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (res.data.status === 200 && res.data.success === 1) {
    return res.data.generatedLinks;
  }
};
export default () => {
  const { data: generatedLinks }: { data: generatedLinksType } = useSWR(
    `/api/shortenlinks`,
    getGeneratedLinks,
    { suspense: true, revalidateOnFocus: true }
  );

  return (
    <section className=" relative   max-h-[292px] w-full overflow-y-scroll  bg-gray/20 py-4  lg:px-20">
      <div className="container mx-auto flex flex-col gap-4">
        {generatedLinks &&
          generatedLinks.reverse().map(({ link, shortLink }, ind) => {
            return (
              <div
                key={ind}
                className="   flex flex-col justify-between rounded bg-white p-4 shadow-sm  xsm:flex-row"
              >
                <p className="   prose truncate">{link}</p>
                <hr className=" mx-2 text-gray xsm:mx-4" />
                <div className=" flex flex-col gap-4  xsm:flex-row ">
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
