import { connect } from "@/database/connectToDB";
import { NextResponse } from "next/server";
import { ShortUrl } from "@/database/models/ShortUrl";

export async function GET(req) {
  try {
    connect();
    const userId = req.nextUrl.searchParams.get("userId");

    const totalLinks = await ShortUrl.countDocuments({ userId });
    if (totalLinks === 0) {
      return NextResponse.json(
        { totalLinks: 0, totalVisits: 0, maxVisits: 0 },
        { status: 200 }
      );
    }
    const queryResult = await ShortUrl.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: "$visits" },
        },
      },
    ]);

    const totalVisits = queryResult[0].totalVisits;

    const maxVisits = (await ShortUrl.findOne({ userId }).sort("-visits"))
      .visits;

    return NextResponse.json(
      { totalLinks, totalVisits, maxVisits },
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
