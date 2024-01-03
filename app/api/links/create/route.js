import { connect } from "@/database/connectToDB";
import { ShortUrl } from "@/database/models/ShortUrl";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  try {
    connect();
    const data = await req.json();
    const { url, name, userId } = data;

    let shortId;
    while (true) {
      shortId = uuid().slice(0, 7);
      const found = await ShortUrl.findOne({ shortId });
      if (!found) break;
    }

    const newLink = new ShortUrl({
      shortId,
      userId,
      name,
      url,
    });
    
    const savedLink = await newLink.save();

    return NextResponse.json({ link: savedLink }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
