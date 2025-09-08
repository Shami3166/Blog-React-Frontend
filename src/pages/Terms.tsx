import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="flex justify-center p-4 sm:p-8 bg-background dark:bg-muted/40">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        <Card className="rounded-2xl border py-5 border-border shadow-xl bg-card">
          {/* Header */}
          <CardHeader className="text-center space-y-2 px-4">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
              Terms & Conditions
            </CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Please read these Terms carefully before using{" "}
              <span className="font-semibold">Ehtesham Munawar’s Blog</span>. By
              accessing our website, you agree to comply with them.
            </p>
          </CardHeader>

          {/* Content */}
          <CardContent className="mt-6 px-4">
            <Tabs defaultValue="intro" className="w-full">
              {/* ✅ Make Tabs scrollable on mobile */}
              <div className="overflow-x-auto">
                <TabsList className="flex sm:grid sm:grid-cols-4 w-max sm:w-full bg-muted rounded-lg p-1 mb-6 space-x-2 sm:space-x-0">
                  <TabsTrigger value="intro" className="whitespace-nowrap">
                    Introduction
                  </TabsTrigger>
                  <TabsTrigger value="use" className="whitespace-nowrap">
                    Use of Website
                  </TabsTrigger>
                  <TabsTrigger value="content" className="whitespace-nowrap">
                    Content Ownership
                  </TabsTrigger>
                  <TabsTrigger value="liability" className="whitespace-nowrap">
                    Limitation of Liability
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tabs Content */}
              <TabsContent
                value="intro"
                className="text-muted-foreground space-y-3"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  1. Introduction
                </h2>
                <p>
                  Welcome to{" "}
                  <span className="font-medium">Ehtesham Munawar’s Blog</span>.
                  By accessing or using our website, you agree to abide by these
                  Terms and Conditions. These terms apply to all visitors,
                  readers, and contributors. If you do not agree with any part
                  of these terms, we kindly ask you to discontinue using the
                  site.
                </p>
                <p>
                  The purpose of these terms is to protect both our blog and our
                  readers by setting clear expectations. We reserve the right to
                  update or modify these terms at any time without prior notice.
                  Continued use of the site after such changes means you accept
                  the revised terms.
                </p>
              </TabsContent>

              <TabsContent
                value="use"
                className="text-muted-foreground space-y-3"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  2. Use of Website
                </h2>
                <p>
                  You agree to use this website only for lawful purposes. You
                  must not attempt to disrupt the site, misuse its features, or
                  engage in any activity that could harm other readers or the
                  overall operation of the blog. Examples of prohibited behavior
                  include attempting to hack, upload malicious code, or spam
                  comments and forms.
                </p>
                <p>
                  You may share and reference our articles, but you must credit
                  the original source. Unauthorized commercial use,
                  distribution, or modification of our content without
                  permission is strictly prohibited. Violating these rules may
                  result in restricted access.
                </p>
              </TabsContent>

              <TabsContent
                value="content"
                className="text-muted-foreground space-y-3"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  3. Content Ownership
                </h2>
                <p>
                  All original articles, tutorials, graphics, and designs
                  published on this blog are the intellectual property of{" "}
                  <span className="font-medium">Ehtesham Munawar</span>, unless
                  otherwise stated. You may quote small portions of content for
                  educational or non-commercial use, provided proper credit and
                  a link back to the source are given.
                </p>
                <p>
                  Unauthorized copying, republishing, or mass distribution of
                  our content without consent is not permitted. Guest posts or
                  third-party contributions remain the intellectual property of
                  their authors, who have granted us publishing rights.
                </p>
              </TabsContent>

              <TabsContent
                value="liability"
                className="text-muted-foreground space-y-3"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  4. Limitation of Liability
                </h2>
                <p>
                  The information provided on this blog is intended for general
                  knowledge and educational purposes only. While we strive for
                  accuracy, we make no guarantees about the completeness,
                  reliability, or timeliness of the information.
                </p>
                <p>
                  We are not responsible for any direct or indirect losses,
                  damages, or consequences that may arise from using our
                  content. Users are encouraged to verify details independently
                  before making decisions based on the material published here.
                </p>
                <p>
                  External links may be included for reference. We are not
                  responsible for the practices or content of external sites,
                  and visiting them is at your own risk.
                </p>
              </TabsContent>
            </Tabs>

            {/* Footer */}
            <p className="text-center mt-8 text-xs sm:text-sm text-muted-foreground italic">
              Last updated: January 1, 2025
              <br /> For questions about these terms, please contact us via the{" "}
              <span className="font-semibold text-foreground">
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
