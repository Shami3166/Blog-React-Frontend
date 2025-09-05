import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Mail, User, Phone } from "lucide-react";
import PostCard from "@/components/posts/PostCard";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { fetchPosts } from "@/features/posts/postsSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((s) => s.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const latestPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.3),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Mobile Apps & Guides
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Explore tutorials, tips, and guides for Android, iOS, WhatsApp,
            Google apps, and more. Stay ahead with the latest mobile knowledge!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/about">
              <Button className="cursor-pointer" size="lg">
                <User className="w-5 h-5 mr-2" /> About Me
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="cursor-pointer" size="lg" variant="outline">
                <Phone className="w-5 h-5 mr-2" /> Contact
              </Button>
            </Link>
            <Link to="/blogs">
              <Button className="cursor-pointer" size="lg" variant="secondary">
                <Mail className="w-5 h-5 mr-2" /> Blog Posts
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Separator className="my-12" />

      <section className="px-6 md:px-12 lg:px-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold">👋 About Me</h2>
          <p className="text-muted-foreground leading-relaxed">
            Hi, I’m <span className="font-semibold">Ehtesham Munawar</span>. I
            share practical tutorials, app guides, and mobile tips to help you
            make the most of your devices. From WhatsApp hacks to iPhone tricks
            — I make tech simple, useful, and fun. 🚀
          </p>
          <Link to="/about">
            <Button className="cursor-pointer" size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </section>

      <Separator className="my-12" />

      <section className="px-6 md:px-12 lg:px-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold">📌 Popular Topics</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge>General Mobile Tips</Badge>
            <Badge>WhatsApp Guides</Badge>
            <Badge>Social Media App Guides</Badge>
            <Badge>Google & Android App Guides</Badge>
            <Badge>iPhone App & iOS Tips</Badge>
          </div>
        </motion.div>
      </section>

      <Separator className="my-12" />

      <section className="px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto space-y-10"
        >
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">
              📰 Latest Blog Posts
            </h2>
            <p className="text-muted-foreground">
              Read the most recent tutorials and app guides.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading posts...
            </p>
          ) : latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No posts available yet.
            </p>
          )}

          <div className="flex justify-center mt-6">
            <Link to="/blogs">
              <Button size="lg" className="px-8 cursor-pointer">
                View All Posts
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Separator className="my-12" />

      <section className="px-6 md:px-12 lg:px-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            📬 Subscribe to My Newsletter
          </h2>
          <p className="text-muted-foreground">
            Get the latest app guides, tips, and updates delivered straight to
            your inbox. No spam — just useful content!
          </p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
