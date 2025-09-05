// src/components/posts/PostCard.tsx
import type { Post } from "@/features/posts/postsTypes";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Card className="flex flex-col rounded-2xl overflow-hidden shadow-md border pb-2  transition-shadow hover:shadow-2xl duration-300">
      {/* Clickable Image */}
      {post.featuredImage && (
        <Link to={`/posts/${post._id}`} className="block overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-52 md:h-64 lg:h-72 object-cover rounded-t-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}

      <div className="p-5 flex flex-col justify-between flex-1">
        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h3>

          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 line-clamp-3">
            <span dangerouslySetInnerHTML={{ __html: post.content }} />
          </p>

          {post.category && (
            <span className="inline-block px-3 py-1 text-xs md:text-sm font-semibold rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:bg-gradient-to-r dark:from-blue-700 dark:to-blue-800 dark:text-blue-200">
              {post.category}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Author & Date */}
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            <span>
              By <span className="font-medium">{post.author?.name}</span>
            </span>
            <span className="block italic">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Read More Button */}
          <Link to={`/posts/${post._id}`} className="self-start sm:self-auto">
            <Button className="cursor-pointer" size="sm">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
