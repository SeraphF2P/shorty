import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  Suspense,
  use,
} from "react";
import Btn from "../../components/Btn";

import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const GeneratedLinks = createContext<{
  generatedLinks: Array<{ link: string; shortLink: string }>;
  getGeneratedLinks: () => Promise<void>;
}>({
  generatedLinks: [],
  getGeneratedLinks: async () => {},
});

export const useGeneratedLinksCotext = () => {
  return useContext(GeneratedLinks);
};
type Props = { children: ReactNode };
export default async ({ children }: Props) => {
  // const [generatedLinks, setGeneratedLinks] = useState([]);
  // const getGeneratedLinks = async () => {
  //   if (localStorage.getItem("token") == undefined) return;
  //   const res = await axios.post(`/api/shortenlinks`, {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });
  //   return res.data.generatedLinks;
  //   // setGeneratedLinks(res.data.generatedLinks);
  // };
  // const generatedLinks = await getGeneratedLinks();
  // getGeneratedLinks();
  // useEffect(() => {
  // }, []);
  return (
    <>
      {/* <GeneratedLinks.Provider value={{ generatedLinks, getGeneratedLinks }}> */}
      {children}
      {/* </GeneratedLinks.Provider> */}
    </>
  );
};
