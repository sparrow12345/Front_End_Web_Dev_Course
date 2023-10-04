import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, {params}: {params: {id: number}}) {


    const id = params.id

    const user = await db.user.findFirst( {where: { id: {equals: id} }} )

    

    return NextResponse.json({user: user})

}