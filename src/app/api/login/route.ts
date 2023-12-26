import { db } from "~/prisma/client";
import * as JWT from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "../../../lib/yupSchema";
import { compare } from "bcrypt";
type Data = {
  msg: string;
  token?: string;
};
export async function POST(req: NextRequest, res: NextResponse<Data>) {
  const data = await req.json();
  const validData = await LoginSchema.validate(data)
  if (!validData) return new Response(JSON.stringify({
    msg: "Invalid data"
  }), {
    status: 400
  })
  try {
    const user = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (user == null) {
      return new Response(
        JSON.stringify({
          msg: "user not found",
        }), {
        status: 404,
      }
      );
    } else {
      if (await compare(validData.password, user.password)) {
        const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET_KEY!);
        return new Response(
          JSON.stringify({
            token: token,
            msg: "login successfully ",
          }), {
          status: 200
        }
        );
      } else {
        return new Response(
          JSON.stringify({
            msg: "unauthenticated",
          }), {
          status: 401
        })
      }
    }
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        msg: "somthing went wrong please check your internet connection",
      }), {
      status: 500
    }
    );
  }
}
