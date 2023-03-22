import { prisma } from "./../../prisma/client";
import { redirect } from "next/navigation";
export default async ({ params }: { params: { shortLink :string} }) => {
  const url = await prisma.link.findFirst({
    where: { shortLink: params.shortLink },
  });
  if (url === null) return;
  redirect(url.link);
};
