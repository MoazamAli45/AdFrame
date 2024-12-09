import React from "react";
import profileImg from "../../../../public/assets/profile.jpg";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UploadImage from "@/components/common/UploadImage";

function page() {
  return (
    <div className="space-y-6 py-5">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <p className="text-gray-600">Update your personal details</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex py-4 gap-2 items-center">
            {/* <Image src={profileImg} alt="profile_img" />
            <Input type="file" className="w-max cursor-pointer" /> */}
            <UploadImage />
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-2  gap-3">
            <div>
              <label
                htmlFor="fname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                First Name
              </label>
              <Input
                type="text"
                id="fname"
                name="user_fname"
                placeholder="First Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last Name
              </label>
              <Input
                type="text"
                id="lname"
                name="user_lname"
                placeholder="Last Name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <Input
                type="text"
                id="email"
                name="user_email"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="user_password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <Input
                type="password"
                id="confirmPassword"
                name="user_confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Button className="block ml-auto">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
