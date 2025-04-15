import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

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

// POST /api/user/posters - Add a new poster to user's posters array
export async function POST(request) {
  try {
    const payload = await verifyToken(request);

    if (!payload || !payload.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { posterUrl, posterData } = await request.json();

    if (!posterUrl) {
      return NextResponse.json(
        { message: "Poster URL is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    console.log("POSTER",posterUrl)

    // Add the new poster URL to the user's posters array
    const updatedUser = await User.findByIdAndUpdate(
      payload.userId,
      { $push: { posters: posterUrl } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Poster added successfully",
      posters: updatedUser.posters,
    });
  } catch (error) {
    console.error("Error adding poster:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/user/posters - Get all posters for the current user
export async function GET(request) {
  try {
    const payload = await verifyToken(request);

    if (!payload || !payload.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findById(payload.userId);

  console.log("USERS",user)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ posters: user.posters });
  } catch (error) {
    console.error("Error fetching posters:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/user/posters - Remove a poster from user's posters array
export async function DELETE(request) {
  try {
    const payload = await verifyToken(request);

    if (!payload || !payload.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { posterUrl } = await request.json();

    if (!posterUrl) {
      return NextResponse.json(
        { message: "Poster URL is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Remove the poster URL from the user's posters array
    const updatedUser = await User.findByIdAndUpdate(
      payload.userId,
      { $pull: { posters: posterUrl } },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Poster removed successfully",
      posters: updatedUser.posters,
    });
  } catch (error) {
    console.error("Error removing poster:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
