import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import User from "@/models/User"; // adjust the import path as per your project
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    await connectToDatabase(); // connect to MongoDB
    const user = await User.findById(payload.userId).select("-password"); // exclude password

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { userId: payload.userId, userData: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
