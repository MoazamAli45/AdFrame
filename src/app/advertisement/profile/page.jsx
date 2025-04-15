import ProfileForm from "./profile-form";

export const metadata = {
  title: "Profile | Update Your Information",
  description: "Update your personal information and account settings",
};

export default async function ProfilePage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <p className="text-gray-600">Update your personal details</p>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}
