import { connect } from "@/database/connectToDB";
import ShortUrl from "@/database/models/ShortUrl";
import User from "@/database/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connect();
    const { user: userData } = await req.json();
    if (await User.findOne({ email: userData.email })) {
      console.log("Duplicate email address");
      return NextResponse.json(
        { error: "Email Already in use" },
        { status: 400 }
      );
    }

    if (userData.password.length < 8) {
      return NextResponse.json({ error: "Password is weak" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = new User({
      fullname: userData.fullname,
      email: userData.email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
