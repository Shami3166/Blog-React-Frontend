// src/pages/EditPost.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { postApi } from "@/api/postApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditPost = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { token, role } = useAppSelector((s) => s.auth);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  // Load post data
  useEffect(() => {
    if (!token || role !== "admin") {
      toast.error("Unauthorized");
      navigate("/");
      return;
    }

    postApi
      .getById(id)
      .then((post) => {
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
      })
      .catch(() => toast.error("Failed to load post"))
      .finally(() => setLoading(false));
  }, [id, token, role, navigate]);

  // Handle form submit
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      if (featuredImage) formData.append("featuredImage", featuredImage);

      await postApi.update(id, formData, token);

      toast.success("Post updated successfully");
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="mt-8 text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border rounded-lg p-2"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
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

        {/* File input for featured image */}
        <div>
          <label className="block mb-1 font-medium">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFeaturedImage(e.target.files[0]);
              }
            }}
          />
        </div>

        <Button type="submit" className="w-full">
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default EditPost;
