import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createPost } from "@/features/posts/postsSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((s) => s.auth);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("You must be logged in to create a post");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (featuredImage) formData.append("featuredImage", featuredImage);

    dispatch(createPost(formData))
      .unwrap()
      .then(() => {
        toast.success("Post created successfully!");
        navigate("/");
      })
      .catch((err) => toast.error(err || "Failed to create post"));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Content (supports HTML or markdown)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />

        {/* ✅ Category dropdown */}
        {/* ✅ Category dropdown with dark mode support */}
        <select
          className="
    w-full border rounded-lg p-2
    bg-white text-gray-900
    dark:bg-gray-800 dark:text-gray-100
    dark:border-gray-700
    focus:outline-none focus:ring-2 focus:ring-blue-500
  "
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="General Mobile Tips">General Mobile Tips</option>
          <option value="WhatsApp Guides">WhatsApp Guides</option>
          <option value="Social Media App Guides">
            Social Media App Guides
          </option>
          <option value="Google & Android App Guides">
            Google & Android App Guides
          </option>
          <option value="iPhone App & iOS Tips">iPhone App & iOS Tips</option>
        </select>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
        />
        <Button type="submit" className="w-full">
          Create Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
