import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Helper function to verify JWT token
async function verifyToken(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

// GET /api/user/profile - Get current user profile
export async function GET(request) {
  try {
    const payload = await verifyToken(request);

    if (!payload || !payload.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request) {
  try {
    const payload = await verifyToken(request);

    if (!payload || !payload.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    await connectToDatabase();
    const user = await User.findById(payload.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Handle password update separately
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      payload.userId,
      { $set: data },
      { new: true, runValidators: true }
    ).select("-password");

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        { message: "Validation error", errors: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
