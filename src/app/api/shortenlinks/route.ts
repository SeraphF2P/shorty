import { db } from "~/prisma/client";

import * as JWT from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { Link } from "@prisma/client";

type Data = {
  msg: string,
  generatedLinks: Link[]
}
export async function POST(req: NextRequest, res: NextResponse<Data>) {
  const data = await req.json();
  if (!data.token) return new Response(JSON.stringify({
    msg: "unautheraize please login first"
  }), {
    status: 401,
  })

  try {
    const verfiedToken = await JWT.verify(
      data.token,
      process.env.JWT_SECRET_KEY!,
    ) as { id: string }

    if (!verfiedToken) return new Response(JSON.stringify({
      msg: "unautheraize please login first"
    }), {
      status: 401,
    })

    const links = await db.link.findMany({
      where: {
        userId: verfiedToken.id,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return new Response(
      JSON.stringify({
        generatedLinks: links,
      }), {
      status: 200,
    }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        msg: "failed to load links",
      }), {
      status: 500,
    }
    );
  }
}
