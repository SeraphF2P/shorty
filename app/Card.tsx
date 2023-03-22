import Image from "next/image";

type Props = {
  title: string;
  children: string;
  icon: string;
  className: string;
};

export default function Card({ title, children, icon, className }: Props) {
  return (
    <div
      className={`${className} relative  flex w-[300px]  flex-col rounded bg-white shadow  xsm:w-[420px] `}
    >
      <div className=" absolute -top-10 left-[50%] lg:left-[20%] flex  h-20 w-20 translate-x-[-50%]  items-center justify-center overflow-hidden rounded-full bg-dark-violet">
        <Image width={48} height={48} src={icon} alt="card icon" />
      </div>
      <div className="prose p-4 pt-10 text-center lg:text-left lg:p-10">
        <h2 className=" mb-0 lg:my-2"> {title}</h2>
        <p>{children}</p>
      </div>
    </div>
  );
}
