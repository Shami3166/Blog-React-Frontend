import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchProfile, updateProfile } from "@/features/profile/profileSlice";
import type { UpdateProfilePayload } from "@/features/profile/profileTypes";
import { toast } from "sonner";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.profile);

  const [formData, setFormData] = useState<UpdateProfilePayload>({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        bio: profile.bio || "",
        avatar: profile.avatar || "",
      });
      setImagePreview(profile.avatar || null);
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("bio", formData.bio ?? "");
      if (avatarFile) data.append("avatar", avatarFile);

      const updatedProfile = await dispatch(updateProfile(data)).unwrap();

      setFormData({
        name: updatedProfile.user.name,
        email: updatedProfile.user.email,
        bio: updatedProfile.user.bio ?? "",
        avatar: updatedProfile.user.avatar ?? "",
      });

      setImagePreview(updatedProfile.user.avatar ?? null);

      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10">
      <Card className="shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center sm:text-left">
            Edit Your Profile
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={handleChange}
                name="bio"
                rows={4}
                placeholder="Tell us something about you..."
                className="mt-1 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="avatar">Upload Profile Image</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
              />
            </div>

            <div className="text-center sm:text-left pt-4">
              <Button
                type="submit"
                className="flex items-center gap-2"
                disabled={loading}
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-6 md:pt-0 md:pl-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Live Profile Preview
          </h2>
          <div className="w-32 h-32 mb-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full border dark:border-gray-600 shadow"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                No Image
              </div>
            )}
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
              {formData.name || "Your Name"}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {formData.email || "you@example.com"}
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 italic">
              {formData.bio || "Your bio will appear here..."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
