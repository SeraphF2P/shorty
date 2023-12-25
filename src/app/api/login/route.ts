import { db } from "~/prisma/client";

export async function POST(req: Request) {
  const data = await req.json();
  const JWT = require("jsonwebtoken");
  try {
    const user = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (user == null) {
      return new Response(
        JSON.stringify({
          status: 404,
          success: 0,
          msg: "user not found",
        })
      );
    } else {
      const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      return new Response(
        JSON.stringify({
          status: 200,
          success: 1,
          token: token,
          msg: "login successfully ",
        })
      );
    }
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        status: 500,
        success: 0,
        msg: "somthing went wrong please check your internet connection",
      })
    );
  }
}
