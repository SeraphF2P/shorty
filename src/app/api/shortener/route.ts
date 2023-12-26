import * as JWT from "jsonwebtoken";
import { customRandom, random } from "nanoid";
import { db } from "~/prisma/client";
export async function POST(req: Request) {
  const data = await req.json();
  try {
    const id = customRandom(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      6,
      random
    );

    const verifedToken = JWT.verify(
      data.token,
      process.env.JWT_SECRET_KEY!
    ) as { id: string };
    if (!verifedToken) {
      return new Response(JSON.stringify({
        msg: "invalid link"
      }), {
        status: 400
      })
    }
    const url = await db.link.create({
      data: {
        link: data.link,
        shortLink: id(),
        userId: verifedToken.id,
      },
    });
    if (url) {
      return new Response(
        JSON.stringify({
          msg: "link created successfully",
          url: url,
        }), {
        status: 200
      }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({
        msg: "link already exists",
      }), {
      status: 400,
    }
    );
  }
}
