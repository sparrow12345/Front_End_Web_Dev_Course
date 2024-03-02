// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET(req: Request, {params}: {params: {username: string, password: string}}) {

//     const username = params.username

//     const user = await db.user.findFirst( {where: { username: {equals: username} }} )
//     if (user == null) {
//         return NextResponse.json({user:null, message: "User does not exist!"})
//     }
//     if (user.password === params.password) {
//         return NextResponse.json({id: user.id, username: user.username, password: user.password})
//     } else {
//         return NextResponse.json({id: user.id, message: "Wrong password!"})
//     }
// }

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as z from "zod";
import { hash } from "bcrypt";

const UserSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    console.log("Here");
    const body = await req.json();
    const { email, username, password } = UserSchema.parse(body);
    console.log(email);
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User already exists!" },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already exists!" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
