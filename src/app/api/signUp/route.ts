import * as JWT from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/prisma/client";
import { SignUpSchema } from "~/src/lib/yupSchema";
import { hash } from 'bcrypt'
type Data = {
  msg: string;
  token?: string;
};

export async function POST(req: NextRequest, res: NextResponse<Data>) {
  try {
    const data = await req.json();
    const validData = await SignUpSchema.validate(data);
    if (!validData) {
      return new Response(
        JSON.stringify({
          msg: "Invalid data",
        }),
        {
          status: 400,
        }
      );
    }
    const existingUser = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          msg: "User already exists",
        }),
        {
          status: 401,
        }
      );
    }
    const hashedPassword = await hash(data.password, 10)
    const newUser = await db.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });

    const token = await JWT.sign(
      { id: newUser.id },
      process.env.JWT_SECRET_KEY!
    );

    return new Response(
      JSON.stringify({
        token,
        msg: "You have signed up successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({
        msg: "Something went wrong",

      }),
      {
        status: 400,
      }
    );
  }
}