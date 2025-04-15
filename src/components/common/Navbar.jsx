"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user ,refresh} = useAuth();

  const router = useRouter();

  const handlelogout = async () => {
    try {
      await axios.get("/api/logout");
      // Trigger a refresh of auth state
      refresh();
      toast.success("LOGGED OUT SUCCESSFULLY!");
      router.push("/login");
    } catch (error) {
      console.error("ERROR", error);
      toast.error(`Error logging out: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold text-[24px]">
            Ad<span className="text-green-600">Frame</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Button onClick={() => router.push("/advertisement")}>
                  Dashboard
                </Button>
                <Button className="bg-red-600" onClick={() => handlelogout()}>
                  Logout{" "}
                </Button>
              </>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  href={"/signup"}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Sign up
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
