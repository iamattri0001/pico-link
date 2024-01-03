import { connect } from "@/database/connectToDB";
import { NextResponse } from "next/server";
import { ShortUrl } from "@/database/models/ShortUrl";

export async function GET(req) {
  try {
    connect();
    const userId = req.nextUrl.searchParams.get("userId");
    const links = await ShortUrl.find({ userId });
    const reverseOrder = links.reverse();
    return NextResponse.json({ links: reverseOrder }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
