import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="flex justify-center p-8 ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <Card className="rounded-3xl py-7 border border-primary/20 shadow-2xl bg-card/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-4xl p-2 font-extrabold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Privacy Policy
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              At{" "}
              <span className="font-semibold text-foreground">
                Ehtesham Munawar’s Blog
              </span>
              , your privacy matters to us. Below you’ll find details on how we
              collect, use, and protect your information.
            </p>
          </CardHeader>

          <CardContent className="mt-6">
            <Accordion
              type="single"
              collapsible
              className="w-full divide-y divide-border"
            >
              <AccordionItem value="intro">
                <AccordionTrigger className="hover:text-primary font-medium">
                  1. Information We Collect
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3">
                  We collect both personal and non-personal information to
                  provide you with a better experience. Personal details include
                  your name, email, or any information you submit through our
                  forms, such as when contacting us. Non-personal information
                  includes technical details like your browser type, device
                  model, operating system, and approximate location. These help
                  us analyze how visitors interact with our content so we can
                  continuously improve our site. In addition, we may use
                  analytics tools that collect anonymized data about page views,
                  reading time, and user interactions. Rest assured, we only
                  collect information necessary to run this blog efficiently.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="use">
                <AccordionTrigger className="hover:text-purple-600 font-medium">
                  2. How We Use Your Information
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3">
                  The information you provide is primarily used to communicate
                  with you and ensure you get the best experience from our blog.
                  For example, if you contact us with questions, we use your
                  email to respond. If you subscribe, we may send updates,
                  newsletters, or new post alerts. Non-personal data, like how
                  long you stay on a page, helps us understand what topics our
                  readers love most so we can create more valuable guides and
                  resources. Importantly, we never sell your personal details to
                  third parties. Your trust is central to our mission, and we
                  only use your information to make your browsing experience
                  smoother, faster, and more personalized.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cookies">
                <AccordionTrigger className="hover:text-pink-600 font-medium">
                  3. Cookies & Tracking
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3">
                  Our blog may use cookies to improve navigation and customize
                  your experience. Cookies are small files stored on your
                  device, and they allow us to remember your preferences such as
                  language, theme mode (light/dark), and recently visited pages.
                  This helps us create a consistent and enjoyable experience
                  each time you visit. Cookies also enable us to understand how
                  readers move through the site, which guides us in improving
                  design and content. While cookies are safe, you can disable
                  them anytime in your browser settings. However, doing so may
                  limit some functionality, such as saving preferences or quick
                  loading of frequently visited sections.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="third-party">
                <AccordionTrigger className="hover:text-blue-600 font-medium">
                  4. Third-Party Services
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3">
                  We sometimes rely on third-party services like Google
                  Analytics, newsletter platforms, or embedded social media
                  content. These services may collect information independently
                  and operate under their own privacy policies. For instance,
                  analytics tools track page visits, reading times, and user
                  demographics, which helps us refine our strategy. If you click
                  on links to external sites, such as recommended apps or
                  external articles, please be aware that we are not responsible
                  for the privacy practices of those websites. We encourage you
                  to review their policies before sharing any information. Our
                  blog does not share your personal details with these services
                  unless explicitly required and authorized by you.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security">
                <AccordionTrigger className="hover:text-green-600 font-medium">
                  5. Data Security
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3">
                  We take data security seriously and apply reasonable measures
                  to protect your information from unauthorized access, misuse,
                  or loss. While no online system can guarantee absolute safety,
                  we implement protective practices such as SSL encryption for
                  data transfer and regular updates to keep our platform secure.
                  In addition, only authorized individuals can access personal
                  information submitted through our blog, and they are committed
                  to keeping it safe. However, please remember that when sharing
                  any information online, you should always be cautious and
                  avoid disclosing sensitive personal data unless absolutely
                  necessary.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rights">
                <AccordionTrigger className="hover:text-orange-600 font-medium">
                  6. Your Rights
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3">
                  You have full control over your personal information. This
                  includes the right to access the data we hold about you,
                  request corrections if details are inaccurate, and even
                  request deletion if you no longer want your information stored
                  with us. In many cases, you can also opt out of cookies, email
                  subscriptions, or third-party tracking tools. To exercise your
                  rights, simply reach out to us via our contact form, and we’ll
                  respond promptly. We respect your privacy choices and aim to
                  make the process transparent and straightforward for all our
                  readers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="updates">
                <AccordionTrigger className="hover:text-red-600 font-medium">
                  7. Policy Updates
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3">
                  This Privacy Policy may be updated occasionally to reflect new
                  regulations, technology changes, or improvements in how we
                  operate. We encourage you to revisit this page regularly to
                  stay informed about updates. If major changes occur, such as
                  adjustments in how your information is used, we may also post
                  a notice on the homepage for greater visibility. By continuing
                  to use our site after updates are posted, you acknowledge and
                  agree to the revised policy. Our goal is to be fully
                  transparent and ensure that your trust in us remains strong as
                  our blog continues to grow.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className="text-center mt-8 text-sm text-muted-foreground italic">
              Questions about this policy? Reach out via our{" "}
              <span className="font-semibold text-primary">
                <Link
                  className="hover:underline hover:text-blue-500"
                  to="/contact"
                >
                  Contact Page
                </Link>
              </span>
              .
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
