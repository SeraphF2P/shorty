import { redirect } from "next/navigation";
import { db } from "~/prisma/client";

export default async ({ params }: { params: { shortLink: string } }) => {
  const url = await db.link.findFirst({
    where: { shortLink: params.shortLink },
  });
  if (url === null) return;
  redirect(url.link);
};
