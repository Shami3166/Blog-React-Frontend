export interface Comment {
  _id: string;
  text: string;
  author: { _id: string; name: string; email?: string };
  post: string;
  createdAt: string;
}
