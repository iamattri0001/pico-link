import { connect } from "@/database/connectToDB";
import { NextResponse } from "next/server";
import { ShortUrl } from "@/database/models/ShortUrl";

export async function GET(req) {
  try {
    connect();
    const shortId = req.nextUrl.searchParams.get("shortId");

    const link = await ShortUrl.findOne({ shortId });
    if (!link) {
      return NextResponse.json({}, { status: 200 });
    }

    await ShortUrl.updateOne({ shortId }, { $inc: { visits: 1 } });

    return NextResponse.json({ url: link.url }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
