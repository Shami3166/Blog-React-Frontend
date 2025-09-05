import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { subscribeNewsletter } from "@/features/newsletter/newsletterSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterForm = () => {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector(
    (state) => state.newsletter
  );
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      dispatch(subscribeNewsletter(email));
      setEmail("");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button className="cursor-pointer" type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      {success && (
        <p className="text-green-600 dark:text-green-400 mt-2 text-sm">
          {success}
        </p>
      )}
      {error && (
        <p className="text-red-600 dark:text-red-400 mt-2 text-sm">{error}</p>
      )}
    </div>
  );
};

export default NewsletterForm;
