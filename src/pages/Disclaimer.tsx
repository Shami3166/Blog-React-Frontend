import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Disclaimer() {
  return (
    <div className="flex justify-center p-6 bg-gradient-to-br from-background to-muted/30">
      <Card className="w-full max-w-4xl shadow-lg rounded-2xl border border-border/50">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-center bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-muted-foreground">
          <p className="text-lg leading-relaxed text-center">
            Welcome to{" "}
            <span className="font-semibold text-foreground">
              Ehtesham Munawar’s Blog
            </span>
            —your guide for{" "}
            <span className="text-primary font-semibold">
              Mobile & App Tips, WhatsApp Guides, Social Media, Google &
              Android, and iOS
            </span>
            . Please take a moment to review our disclaimer below.
          </p>

          <Separator />

          <section className="p-5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
            <h2 className="text-2xl font-semibold text-primary mb-3">
              1. General Information
            </h2>
            <p>
              The content on this blog is provided for{" "}
              <span className="font-semibold">
                educational and informational
              </span>{" "}
              purposes only. While every effort is made to ensure accuracy, we
              make no guarantees about the completeness or reliability of the
              content.
            </p>
          </section>

          <section className="p-5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
            <h2 className="text-2xl font-semibold text-primary mb-3">
              2. No Professional Advice
            </h2>
            <p>
              The guides and tutorials here are{" "}
              <span className="font-semibold">not professional advice</span>.
              Please consult with experts if you need personalized assistance.
              You are solely responsible for how you apply the tips shared here.
            </p>
          </section>

          <section className="p-5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
            <h2 className="text-2xl font-semibold text-primary mb-3">
              3. External Links
            </h2>
            <p>
              Our blog may include{" "}
              <span className="font-semibold">external links</span> to apps,
              websites, or resources. We are not responsible for the reliability
              or safety of third-party content. Clicking links is at your own
              risk.
            </p>
          </section>

          <section className="p-5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
            <h2 className="text-2xl font-semibold text-primary mb-3">
              4. Limitation of Liability
            </h2>
            <p>
              We will not be held liable for{" "}
              <span className="font-semibold">any losses or damages</span>{" "}
              arising from the use of this blog’s content. By using this site,
              you accept personal responsibility for your actions.
            </p>
          </section>

          <section className="p-5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
            <h2 className="text-2xl font-semibold text-primary mb-3">
              5. Updates to This Disclaimer
            </h2>
            <p>
              This disclaimer may be updated or changed at any time. Please
              check back regularly to stay informed about our policies.
            </p>
          </section>

          <Separator />

          <p className="text-center text-base font-medium italic text-foreground">
            By using this blog, you agree to the terms of this disclaimer. If
            you do not agree, kindly stop using this website.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
