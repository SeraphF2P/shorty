import { prisma } from "../../../prisma/client";

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  try {
    const newUser = await prisma.User.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
    if (newUser) {
      return new Response(
        JSON.stringify({
          status: 200,
          success: 1,
          token: newUser.id,
          msg: "you have sign up successfully ",
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 401,
          success: 0,
          msg: "user already exists",
        })
      );
    }
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
