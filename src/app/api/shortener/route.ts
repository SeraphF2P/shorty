import { db } from "~/prisma/client";
import { customRandom, random } from "nanoid";
import * as JWT from "jsonwebtoken";
export async function POST(req: Request) {
  const data = await req.json();
  try {
    const id = customRandom(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      6,
      random
    );

    const verifedData = await JWT.verify(
      data.token,
      process.env.JWT_SECRET_KEY
    );
    const url = await db.link.create({
      data: {
        link: data.link,
        shortLink: id(),
        userId: verifedData.id,
      },
    });
    if (url) {
      return new Response(
        JSON.stringify({
          status: 200,
          success: 1,
          msg: "link added successfully",
          url: url,
        })
      );
    }
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        status: 200,
        success: 0,
        msg: "link already exists",
      })
    );
  }
}
