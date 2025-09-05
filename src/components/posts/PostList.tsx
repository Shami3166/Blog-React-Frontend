/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchPosts, setFilters } from "@/features/posts/postsSlice";
import PostCard from "./PostCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Smartphone, MessageCircle, Share2, Chrome, Apple } from "lucide-react";

const categories = [
  { name: "General Mobile Tips", icon: Smartphone },
  { name: "WhatsApp Guides", icon: MessageCircle },
  { name: "Social Media App Guides", icon: Share2 },
  { name: "Google & Android App Guides", icon: Chrome },
  { name: "iPhone App & iOS Tips", icon: Apple },
];

const POSTS_PER_PAGE = 12;

const PostList = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error, filters } = useAppSelector((s) => s.posts);
  const { role } = useAppSelector((s) => s.auth);

  const [searchText, setSearchText] = useState(filters.search || "");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Apply search filter with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFilters({ ...filters, search: searchText }));
      setCurrentPage(1); // Reset to first page only when search changes
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText, dispatch]);

  // Filter posts locally
  const filteredPosts = posts.filter((p) => {
    const matchesCategory =
      !filters.category || p.category === filters.category;
    const matchesSearch =
      !filters.search ||
      p.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-10 ">
      {/* Admin Create Post Button */}
      {role === "admin" && (
        <div className="flex justify-end mb-8">
          <Link to="/create-post">
            <Button
              variant="default"
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Create Post
            </Button>
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((c) => (
          <Button
            key={c.name}
            variant={filters.category === c.name ? "default" : "outline"}
            className={`flex items-center gap-2 ${
              filters.category === c.name
                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                : ""
            }`}
            onClick={() => {
              dispatch(setFilters({ ...filters, category: c.name }));
              setCurrentPage(1);
            }}
          >
            <c.icon className="w-4 h-4" />
            {c.name}
          </Button>
        ))}

        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
          onClick={() => {
            dispatch(setFilters({ category: undefined, search: "" }));
            setSearchText("");
            setCurrentPage(1);
          }}
        >
          All
        </Button>
      </div>

      <div className="mb-10">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all"
        />
      </div>

      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 lg:mx-6  sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4">
          {currentPosts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
          No posts found.
        </p>
      )}

      {totalPages > 1 && (
        <Pagination className="flex justify-center mt-10 cursor-pointer">
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                onClick={
                  currentPage === 1
                    ? undefined
                    : () => goToPage(currentPage - 1)
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => goToPage(i + 1)}
                  className={`${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                      : ""
                  }`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={
                  currentPage === totalPages
                    ? undefined
                    : () => goToPage(currentPage + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default PostList;
