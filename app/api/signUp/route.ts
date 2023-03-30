import { prisma } from "../../../prisma/client";

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const JWT = require("jsonwebtoken");
  try {
    const existsUser = await prisma.User.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existsUser)
      return new Response(
        JSON.stringify({
          status: 401,
          success: 0,
          msg: "user already exists",
        })
      );
    const newUser = await prisma.User.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
    const token = await JWT.sign(
      { id: newUser.id },
      process.env.JWT_SECRET_KEY
    );
    return new Response(
      JSON.stringify({
        status: 200,
        success: 1,
        token: token,
        msg: "you have sign up successfully ",
      })
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        status: 500,
        success: 0,
        msg: "somthing went wrong",
      })
    );
  }
}
