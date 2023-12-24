import { prisma } from "../../../prisma/client";
import { SignUpSchema } from "../../lib/yupSchema";
import type { NextApiRequest, NextApiResponse } from "next";
import * as JWT from "jsonwebtoken";

type Data = {
  msg: string;
  token?: string,
};



export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = await req.body;
  const validData = await SignUpSchema.validate(data);
  if (!validData) return res.status(400).json({
    msg: "Invalid data"
  })
  try {
    const existsUser = await prisma.User.findUnique({
      where: {
        username: data.username,
      },
    });
    if (existsUser)
      return res.status(401).json({
        msg: "user already exists",
      })

    const newUser = await prisma.User.create({
      data: {
        username: data.username,
        password: data.password,
      },
    });
    const token = await JWT.sign(
      { id: newUser.id },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
      token: token,
      msg: "you have sign up successfully ",
    })

  } catch (err) {
    return res.status(400).json({
      msg: "somthing went wrong",
    })
  }
}
