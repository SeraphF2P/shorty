"use client";
import { BtnProps } from "./Btn";
import Modale from "./Modale";

export default ({ ...props }: BtnProps) => {
  return (
    <Modale>
      <Modale.Btn {...props} />
      <Modale.Content></Modale.Content>
    </Modale>
  );
};
