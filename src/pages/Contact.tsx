import { useState, type FormEvent, useEffect } from "react";

import { sendMessage, resetContact } from "@/features/contact/contactSlice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toast } from "sonner";
import { MessageSquare, Send } from "lucide-react";

export default function Contact() {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.contact);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(sendMessage(form));
  };

  useEffect(() => {
    if (success) {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      dispatch(resetContact());
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch]);

  return (
    <div className="flex justify-center px-4 py-10">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-primary" />
            Contact Us
          </CardTitle>
          <CardDescription>
            Have questions, feedback, or ideas? Fill out the form below and
            we’ll get back to you soon.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
    
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="min-h-[120px]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full flex items-center gap-2"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && <Send className="w-4 h-4" />}
            </Button>
          </form>

          <Separator className="my-8" />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">📩 Stay Connected</h3>
            <p className="text-muted-foreground">
              You can also reach us via email at{" "}
              <span className="font-medium">support@myblog.com</span>
            </p>
            <p className="text-sm text-muted-foreground">
              We value your feedback and ideas. Your thoughts help make this
              blog better!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
