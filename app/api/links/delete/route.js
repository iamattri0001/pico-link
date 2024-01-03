import { connect } from "@/database/connectToDB";
import { ShortUrl } from "@/database/models/ShortUrl";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  try {
    connect();
    const data = await req.json();
    const { _id, userId } = data;

    if (!_id || !userId) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const found = await ShortUrl.findOne({ _id, userId });
    if (!found) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const res = await ShortUrl.deleteOne({ _id, userId });
    if (!res.acknowledged) {
      return NextResponse.json(
        { message: "Unable to delete" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
