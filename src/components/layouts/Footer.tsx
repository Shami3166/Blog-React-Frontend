import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Twitter, Github, Linkedin } from "lucide-react";
import NewsletterForm from "../newsletter/NewsletterForm";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Mobile & App Guides
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your ultimate resource for mobile apps, guides, tutorials, and tips
            to enhance your productivity and mobile experience.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://x.com/EhteshamMunawar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/ehtesham-munawar-5b9562382/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/Shami3166"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Explore
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                to="/blogs"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/disclaimer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Subscribe to our newsletter
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get the latest app guides, tutorials, and updates directly in your
            inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {currentYear} Mobile & App Guides. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
