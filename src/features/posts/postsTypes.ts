export interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  category: string;
  featuredImage?: string;
  images?: string[];
  videos?: string[];
  createdAt: string;
  updatedAt?: string;
}
