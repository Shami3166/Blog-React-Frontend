import PostList from "@/components/posts/PostList";

const Blog = () => (
  <div className="mx-auto max-w-7xl  md:px-8 mt-12">
    <section className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Explore Our Latest Tech Insights
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
        Stay up-to-date with the latest tips, guides, and tutorials on mobile
        apps, social media, and technology trends. Dive in and discover
        something new today!
      </p>
    </section>

    <section className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg shadow-sm transition-colors">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Latest Posts
      </h2>
      <PostList />
    </section>
  </div>
);

export default Blog;
