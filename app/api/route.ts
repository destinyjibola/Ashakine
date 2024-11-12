import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import User from "../../model/user";
import { connect } from "../../lib/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    const newuser = new User({
      name,
      email,
      password,
    });
    // const newuser = await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     password,
    //   },
    // });
    return NextResponse.json(
      {
        message: "Data added succesfully",
        success: true,
        data: newuser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
