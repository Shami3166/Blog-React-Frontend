import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

function AboutHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center"
    >
      <Avatar className="h-32 w-32 mb-4 ring-4 ring-primary/40 shadow-lg">
        <AvatarImage
          src="https://res.cloudinary.com/durzqqis6/image/upload/v1756991395/Tech_Professional_Against_Coding_Backdrop-removebg-preview_1_sqfo7h.png"
          alt="Ehtesham Munawar"
        />
        <AvatarFallback>EM</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
        Ehtesham Munawar
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Blogger • Mobile & App Guides Enthusiast
      </p>
    </motion.div>
  );
}

function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4 text-muted-foreground leading-relaxed"
    >
      <p>
        Hi, I’m{" "}
        <span className="font-semibold text-foreground">Ehtesham Munawar</span>.
        Welcome to my blog where I share practical tutorials, app guides, and
        mobile tips to help you make the most of your devices. With smartphones
        now the center of our daily lives, my goal is to simplify technology so
        that anyone can use it with confidence.
      </p>
      <p>
        Over the years, I’ve explored both Android and iOS systems deeply. From
        productivity hacks to hidden tricks in WhatsApp, Google apps, or iPhone
        features, I’ve tested them all — and now I share the best of that
        knowledge with you. This blog is my way of making complex tech simple,
        useful, and fun.
      </p>
      <p>
        You’ll find guides that improve your digital lifestyle — whether you
        want to secure your data, boost productivity, explore social media
        creatively, or just learn shortcuts that make everyday tasks easier. I
        write for both beginners and tech enthusiasts, so there’s something
        valuable here for everyone.
      </p>
      <p>
        Technology is evolving fast, and I’m here to help you stay ahead with
        reliable, easy-to-follow resources. 🚀 Let’s explore the world of mobile
        apps together!
      </p>
    </motion.div>
  );
}

function AboutTopics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-3"
    >
      <h2 className="text-xl font-semibold">📌 Topics I Cover</h2>
      <div className="flex flex-wrap gap-2">
        <Badge>General Mobile Tips</Badge>
        <Badge>WhatsApp Guides</Badge>
        <Badge>Social Media App Guides</Badge>
        <Badge>Google & Android App Guides</Badge>
        <Badge>iPhone App & iOS Tips</Badge>
      </div>
    </motion.div>
  );
}

function AboutSocials() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-col mb-2 items-center gap-3"
    >
      <h2 className="text-xl font-semibold">🌍 Connect with Me</h2>
      <div className="flex gap-4">
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://github.com/Shami3166"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://x.com/EhteshamMunawar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://www.linkedin.com/in/ehtesham-munawar-5b9562382/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.3),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_70%)]" />

      <Card className="w-full max-w-4xl shadow-xl rounded-2xl py-5 border border-border/40">
        <CardContent className=" space-y-8">
          <AboutHeader />
          <Separator />
          <AboutContent />
          <Separator />
          <AboutTopics />
          <Separator />
          <AboutSocials />
        </CardContent>
      </Card>
    </div>
  );
}
