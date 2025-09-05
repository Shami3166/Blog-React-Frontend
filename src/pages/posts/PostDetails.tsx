import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchPostById, deletePost } from "@/features/posts/postsSlice";
import { addComment, fetchComments } from "@/features/comments/commentSlice";
import { selectCommentsByPostId } from "@/features/comments/commentSelectors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PostDetails = () => {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { current, loading } = useAppSelector((s) => s.posts);
  const comments = useAppSelector((state) => selectCommentsByPostId(state, id));
  const { token, role } = useAppSelector((s) => s.auth);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchPostById(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const onAdd = () => {
    if (!token) {
      toast.error("Login to comment");
      return;
    }
    if (!text.trim()) return;
    dispatch(addComment({ postId: id, text }))
      .unwrap()
      .then(() => {
        setText("");
        toast.success("Comment added");
      })
      .catch((e) => toast.error(e));
  };

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (!token) return;
      dispatch(deletePost(id))
        .unwrap()
        .then(() => {
          toast.success("Post deleted");
          navigate("/");
        })
        .catch((e) => toast.error(e));
    }
  };

  if (loading || !current)
    return <p className="mt-8 text-center">Loading...</p>;

  return (
    <div className="mx-auto max-w-5xl mt-12 space-y-10 px-4 md:px-0">
      <article className="relative border rounded-3xl p-10 shadow-xl bg-white dark:bg-gray-900 transition-all hover:shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">
          {current.title}
        </h1>
        <div className="flex flex-wrap items-center justify-between text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
          <span>
            By{" "}
            <strong className="text-indigo-500 dark:text-indigo-400">
              {current.author?.name}
            </strong>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {new Date(current.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div
          className="
    prose prose-lg max-w-none

    /* Headings */
    prose-h1:text-4xl prose-h1:font-extrabold prose-h1:text-gray-900 dark:prose-h1:text-gray-100
    prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-800 dark:prose-h2:text-gray-200
    prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-gray-700 dark:prose-h3:text-gray-300
    prose-h4:text-xl prose-h4:font-medium prose-h4:text-gray-600 dark:prose-h4:text-gray-400

    /* Paragraphs */
    prose-p:text-gray-800 dark:prose-p:text-gray-200 prose-p:leading-relaxed

    /* Links */
    prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline

    /* Lists */
    prose-ul:list-disc prose-ul:ml-6 prose-li:mb-2 dark:prose-li:text-gray-300
    prose-ol:list-decimal prose-ol:ml-6

    /* Images */
    prose-img:block prose-img:w-full prose-img:h-[550px] object-cover prose-img:rounded-2xl prose-img:shadow-lg prose-img:border

    /* Tables */
    prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600
    prose-th:bg-gray-100 prose-th:text-gray-900 dark:prose-th:bg-gray-800 dark:prose-th:text-gray-100
    prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600
    prose-td:text-gray-700 dark:prose-td:text-gray-200

    /* Blockquotes */
    prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600
    prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800
    prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-200
    prose-blockquote:italic prose-blockquote:px-4 prose-blockquote:py-2

    /* Code & pre */
    prose-code:bg-gray-100 prose-code:text-red-600 dark:prose-code:bg-gray-800 dark:prose-code:text-red-400 prose-code:px-1 prose-code:py-0.5 rounded
    prose-pre:bg-gray-900 prose-pre:text-gray-100 dark:prose-pre:bg-gray-800 dark:prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto

    /* Horizontal rules */
    prose-hr:border-gray-300 dark:prose-hr:border-gray-600

    /* Strong / Em */
    prose-strong:text-gray-900 dark:prose-strong:text-gray-100
    prose-em:text-gray-800 dark:prose-em:text-gray-200

    [&>*]:mx-0 [&>*]:my-4
  "
          dangerouslySetInnerHTML={{ __html: current.content }}
        />

        {role === "admin" && (
          <div className="flex gap-4 mt-8">
            <Link to={`/edit-post/${current._id}`}>
              <Button
                variant="default"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 transition-transform"
              >
                Edit Post
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="hover:scale-105 transition-transform"
              onClick={onDelete}
            >
              Delete Post
            </Button>
          </div>
        )}
      </article>

      <section className="border rounded-3xl p-6 shadow-lg bg-gray-50 dark:bg-gray-800 transition-colors hover:shadow-xl">
        <h3 className="font-semibold text-lg md:text-xl mb-5 text-gray-900 dark:text-gray-100">
          Comments ({comments.length})
        </h3>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <Input
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button
            onClick={onAdd}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-all"
          >
            Send
          </Button>
        </div>

        <ul className="space-y-5">
          {comments.map((c) => (
            <li
              key={c._id}
              className="border rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {c.author?.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="text-gray-800 dark:text-gray-200">{c.text}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PostDetails;
