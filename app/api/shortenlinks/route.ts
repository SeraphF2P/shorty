import { prisma } from "../../../prisma/client";

export async function POST(req: Request) {
  const JWT = require("jsonwebtoken");
  const request = await req.json();
  const authHeaders = request.headers["Authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  try {
    return await JWT.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (err: any, { id }: { id: string }) => {
        if (err) {
          console.log(err);
          return new Response(
            JSON.stringify({
              status: 401,
              success: 0,
              msg: "unauthorized",
            })
          );
        }
        const links = await prisma.Link.findMany({
          where: {
            userId: id,
          },
        });
        if (links == null) {
          return new Response(
            JSON.stringify({
              status: 404,
              success: 0,
              msg: "failed to find links",
            })
          );
        } else {
          return new Response(
            JSON.stringify({
              status: 200,
              success: 1,
              generatedLinks: links,
            })
          );
        }
      }
    );
  } catch (err) {
    console.log("catchedError", err);
    return new Response(
      JSON.stringify({
        status: 500,
        success: 0,
        msg: "failed to load data",
      })
    );
  }
}
