blog-frontend/
│── public/
│ └── index.html
│
│── src/
│ ├── api/ # API layer
│ │ ├── axiosClient.ts # Base Axios instance
│ │ ├── authApi.ts # Auth-related API calls
│ │ ├── postApi.ts # Post-related API calls
│ │ └── commentApi.ts # Comment-related API calls
│ │
│ ├── app/ # Redux store setup
│ │ ├── store.ts
│ │ └── hooks.ts
│ │
│ ├── features/ # Redux slices
│ │ ├── auth/
│ │ │ ├── authSlice.ts
│ │ │ └── authTypes.ts
│ │ ├── posts/
│ │ │ ├── postsSlice.ts
│ │ │ └── postTypes.ts
│ │ └── comments/
│ │ ├── commentSlice.ts
│ │ └── commentTypes.ts
│ │ └── commentSelector.ts
│ │
│ ├── components/ # Reusable UI
│ │ ├── layout/ # Layout components
│ │ │ ├── Navbar.tsx
│ │ │ ├── Footer.tsx
│ │ │ └── PrivateRoute.tsx
│ │ ├── posts/ # Post-related UI
│ │ │ ├── PostCard.tsx
│ │ │ └── PostList.tsx
│ │ └── common/ # Shared elements
│ │  
│ │
│ ├── pages/ # Route-level pages
│ │ │── Home.tsx
│ │ │── About.tsx
│ │ │── Contact.tsx
│ │ │── PrivacyPolicy.tsx
│ │ │── Terms.tsx
│ │ │── Disclaimer.tsx
| | |
| | ├── auth/
│ | | ├── Login.tsx
│ | | ├── Register.tsx
│ | |
| | ├── posts/
│ | | ├── PostDetails.tsx
│ | |
| | ├── profile/
│ └── index.tsx  
│ │
│ ├── routes/ # App routes config
│ │ └── appRoutes.tsx
│ │
│ ├── types/ # Global/common types
│ │ ├── user.ts
│ │ ├── api.ts # ApiResponse, ApiError, Paginated<T>
│ │ └── index.ts # Re-exports
│ │
│ ├── utils/ # Helpers & utilities
│ │ ├── storage.ts
│ │ └── validators.ts
│ │
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
│
│── tsconfig.json
│── package.json
│── .env
│── .gitignore

blog-backend/
│── package.json
│── tsconfig.json
│── .env # environment variables (DB_URL, JWT_SECRET, ADMIN_EMAIL, etc.)
│── .env.example # environment variables (DB_URL, JWT_SECRET, ADMIN_EMAIL, etc.)
│── .gitignore
│── src/
│ │── server.ts # entry point
│ │
│ ├── config/
│ │ └── db.ts # MongoDB connection
│ │
│ ├── models/
│ │ ├── User.ts # User schema (admin + normal users)
│ │ ├── Post.ts # Blog post schema
│ │ └── Comment.ts # Comment schema
│ │
│ ├── routes/
│ │ ├── authRoutes.ts # Register, login
│ │ ├── postRoutes.ts # Blog post CRUD
│ │ └── commentRoutes.ts # Comments on posts
│ │
│ ├── controllers/
│ │ ├── authController.ts # Handles signup, login
│ │ ├── postController.ts # Handles blog CRUD
│ │ └── commentController.ts # Handles comments
│ │
│ ├── middleware/
│ │ ├── authMiddleware.ts # Check JWT token
│ │ └── roleMiddleware.ts # Check admin role
│ │ └── errorMiddleware.ts  
│ │ └── cleanQuery.ts  
│ ├── utils/
│ │ ├── generateToken.ts # JWT token generator
│ │ ├── logger.ts # Logger utility
│ │ └── validators.ts # Validation helpers
│ │ ├── seedPost.ts
│ │ └── seedAdmin.ts
│ │
│ └── types/
│ └── express.d.ts # Custom TS types (extend Request with user)
│ └── declarartion.d.ts  
│ └── xss-clean.d.ts  
└── dist/ # Compiled JS files (from TypeScript build)

backend files all code......

/.env flie code

PORT=5000
MONGO_URI=mongodb://localhost:27017/blogDb
JWT_SECRET=ehtisham_Shami316@aeiou11
ADMIN_EMAIL=sahtisham928@gmail.com
ADMIN_PASSWORD=Shami@316_Jutt

/.env.example file code...

PORT=
MONGO_URI=
JWT_SECRET=

/src/config/db.ts file code

import mongoose from "mongoose";

const connectDB = async () : Promise<void> =>{

    const uri = process.env.MONGO_URI
    if (!uri) {
        throw new Error("MONGO_URI is missing the .env")
    }

    try {
        const conn = await mongoose.connect(uri)
        console.log(`MongoDB connected to : ${conn.connection.host}/${conn.connection.name}`)
    } catch (err) {
        console.error("MongoDn not connected", err)
        process.exit(1)
    }

}

export default connectDB

/src/models/Post

import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
title: string;
content: string;
author: mongoose.Types.ObjectId;
createdAt: Date;
updatedAt: Date;
}

const postSchema: Schema<IPost> = new Schema(
{
title: { type: String, required: true },
content: { type: String, required: true },
author: { type: Schema.Types.ObjectId, ref: "User", required: true },
},
{ timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;

/src/models/Comment

import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { IPost } from "./Post";

export interface IComment extends Document {
text: string;
author: IUser["_id"];
post: IPost["_id"];
createdAt: Date;
}

const commentSchema: Schema<IComment> = new Schema(
{
text: { type: String, required: true },
author: { type: Schema.Types.ObjectId, ref: "User", required: true },
post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
},
{ timestamps: true }
);

export default mongoose.model<IComment>("Comment", commentSchema);

/src/models/User

import mongoose, { Document, Schema,Types } from "mongoose";

export interface IUser extends Document {
\_id: Types.ObjectId,
name: string,
email:string,
password: string,
role: "user" | "admin"
}

const userSchema : Schema<IUser> = new Schema(
{
name:{
type:String,
required:true,
trim:true
},
email:{
type:String,
unique:true,
lowercase:true,
required:true
},
password:{
type:String,
minlength: 8,
required:true

        },
        role:{
            type:String,
            enum:["admin", "user"],
            default: "user"
        }

    },
    {timestamps:true}

)

const User = mongoose.model<IUser>("User", userSchema)
export default User

/src/controllers/postControllers.ts file code

import { Response } from "express";
import Post from "../models/Post";
import { AuthRequest } from "../middlewares/authMiddleware";
// ✅ Create Post (only logged-in users)
export const createPost = async (req: AuthRequest, res: Response) => {
try {
const { title, content } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const post = new Post({
      title,
      content,
      author: req.user._id, // comes from authMiddleware
    });

    await post.save();
    res.status(201).json(post);

} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

// ✅ Get all posts
export const getPosts = async (req: AuthRequest, res: Response) => {
try {
const posts = await Post.find().populate("author", "name email");
res.json(posts);
} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

// ✅ Get single post
export const getPostById = async (req: AuthRequest, res: Response) => {
try {
const post = await Post.findById(req.params.id).populate("author", "name email");
if (!post) return res.status(404).json({ message: "Post not found" });
res.json(post);
} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

// ✅ Update post (only author)
export const updatePost = async (req: AuthRequest, res: Response) => {
try {
const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();
    res.json(post);

} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

// ✅ Delete post (only admin)
export const deletePost = async (req: AuthRequest, res: Response) => {
try {
const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete posts" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });

} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

/src/controllers/authControllers.ts file code
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";

import { generateToken } from "../utils/generateToken";
import { validateEmail, validatePassword } from "../utils/validators";
import { logger } from "../utils/logger";

// 📌 Register new user (now returns token + user)
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
try {
const { name, email, password } = req.body;

    // ✅ Basic validation
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be 6+ chars and contain letters & numbers" });
    }

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create user
    const user: IUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // ✅ Generate token and return it
    const token = generateToken(String(user._id), user.role);

    logger(`New user registered: ${email}`);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

} catch (error) {
logger(`Register error: ${error}`, "error");
next(error); // ✅ Pass to centralized error handler
}
};

// 📌 Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
try {
const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate token
    const token = generateToken(String(user._id), user.role);

    logger(`User logged in: ${email}`);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

} catch (error) {
logger(`Login error: ${error}`, "error");
next(error); // ✅ Pass to centralized error handler
}
};

/src/controllers/commentControllers.ts file code
import { Response } from "express";
import Comment from "../models/Comment";
import { AuthRequest } from "../middlewares/authMiddleware";
// ✅ Add comment (only logged-in users)
export const addComment = async (req: AuthRequest, res: Response) => {
try {
const { text } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const comment = new Comment({
      text,
      author: req.user._id,
      post: req.params.postId, // post id from URL
    });

    await comment.save();
    res.status(201).json(comment);

} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

// ✅ Get all comments for a post
export const getComments = async (req: AuthRequest, res: Response) => {
try {
const comments = await Comment.find({ post: req.params.postId })
.populate("author", "name email")
.sort({ createdAt: -1 });

    res.json(comments);

} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

/src/middlewares/authMiddleware.ts file code
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export interface AuthRequest extends Request {
user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
let token;

if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
try {
token = req.headers.authorization.split(" ")[1];
const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }

}

if (!token) {
return res.status(401).json({ message: "Not authorized, no token" });
}
};

/src/middlewares/roleMiddleware.ts file code

import { Request, Response, NextFunction } from "express";

// ✅ Admin Only Middleware
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
if (req.user?.role !== "admin") {
return res.status(403).json({ message: "Admins only" });
}
next();
};

/src/middlewares/errorMiddleware.ts file code
import { Request, Response, NextFunction } from "express";

// Custom error handler
export const errorHandler = (
err: any,
req: Request,
res: Response,
next: NextFunction
) => {
console.error("❌ Error:", err.message);

// If you want detailed stack only in dev
const isDev = process.env.NODE_ENV !== "production";

res.status(err.statusCode || 500).json({
success: false,
message: err.message || "Server Error",
...(isDev && { stack: err.stack }), // only show stack in dev
});
};

/src/middlewares/cleanQuery.ts...

// middlewares/cleanQuery.ts
import { Request, Response, NextFunction } from "express";

export const cleanQuery = (req: Request, res: Response, next: NextFunction) => {
if (!req.query) return next();

Object.keys(req.query).forEach((key) => {
const value = req.query[key];

    // Only clean string values
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") {
        delete req.query[key]; // remove empty strings
      } else {
        req.query[key] = trimmed;
      }
    }

});

next();
};

/src/routes/authRoutesimport { Router } from "express";
import { loginUser, registerUser } from "../controllers/authControllers";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

/src/routes/postRoutes.ts file code...

import { Router } from "express";
// controller filename: postControllers.ts
import { protect } from "../middlewares/authMiddleware";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postController";
import { adminOnly } from "../middlewares/roleMiddleware";

// use adminOnly middleware

const router = Router();

router.post("/", protect, createPost); // create post (logged-in)
router.get("/", getPosts); // get all posts
router.get("/:id", getPostById); // get single post
router.put("/:id", protect, updatePost); // update post (author)
router.delete("/:id", protect, adminOnly, deletePost); // delete post (admin only)

export default router;

/src/routes/commentRoutes.ts file code
import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { addComment, getComments } from "../controllers/commentController";
// fixed folder name

const router = Router({ mergeParams: true });

// ✅ Routes
router.post("/", protect, addComment);  
router.get("/", getComments);

export default router;

/src/types/express.d.ts file code

import { IUser } from "../../models/User";

declare global {
namespace Express {
interface Request {
user?: IUser; // now req.user works everywhere
}
}
}

/src/types/declaration.d.ts file code

declare module "hpp";
declare module "morgan";

/src/types/xss-clean.d.ts file code

declare module "xss-clean" {
import { RequestHandler } from "express";
const xss: () => RequestHandler;
export default xss;
}

/src/utils/generateToken.ts file code
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret"; // must be in .env

export const generateToken = (id: string, role: string) => {
return jwt.sign(
{ id, role }, // payload
JWT_SECRET, // secret key
{ expiresIn: "1d" } // token validity
);
};

/src/utils/logger.ts file code
export const logger = (message: string, type: "info" | "error" = "info") => {
const time = new Date().toISOString();
if (type === "error") {
console.error(`[ERROR] [${time}] ${message}`);
} else {
console.log(`[INFO] [${time}] ${message}`);
}
};

/src/utils/validators.ts file code
// ✅ Email Validator
export const validateEmail = (email: string): boolean => {
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);
};

// ✅ Password Validator (at least 6 chars, 1 number, 1 letter)
export const validatePassword = (password: string): boolean => {
const regex = /^(?=._[A-Za-z])(?=._\d)[A-Za-z\d]{6,}$/;
return regex.test(password);
};

/src/utils/seedAdmin.ts file code

// src/utils/seedAdmin.ts
import bcrypt from "bcryptjs";
import User from "../models/User";

export const seedAdmin = async (email?: string, password?: string) => {
if (!email || !password) return;
const exists = await User.findOne({ email });
if (exists) return;

const hashed = await bcrypt.hash(password, 10);
await User.create({ name: "Admin", email, password: hashed, role: "admin" });
console.log("✅ Admin user seeded:", email);
};

/src/utils/seedPost.ts file code
import Post from "../models/Post"; // make sure your Post model path is correct

interface SeedPost {
title: string;
content: string;
author?: string; // optional: you can link it to an admin user ID
}

const initialPosts: SeedPost[] = [
{
title: "Welcome to My Blog",
content: "This is the first post. Edit or delete it as you like!",
},
{
title: "React + TypeScript Setup",
content: "Learn how to set up a React project with TypeScript and Redux Toolkit.",
},
{
title: "MERN Stack Guide",
content: "This is a sample post for your MERN stack blog application.",
},
];

export const seedPosts = async () => {
try {
const count = await Post.countDocuments();
if (count === 0) {
await Post.insertMany(initialPosts);
console.log("✅ Seeded initial posts successfully!");
} else {
console.log("ℹ️ Posts already exist, skipping seeding.");
}
} catch (err) {
console.error("❌ Error seeding posts:", err);
}
};

/src/server.ts file code
// src/server.ts
import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import dotenvSafe from "dotenv-safe";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import morgan from "morgan";
import path from "path";

// ... (other imports)
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";
import { seedAdmin } from "./utils/seedAdmin";
import { seedPosts } from "./utils/seedPost";

// ✅ Load environment variables safely
dotenvSafe.config({
  allowEmptyValues: false,
  example: ".env.example",
});

// ✅ Connect to MongoDB and seed data
connectDB().then(() => {
  seedPosts();
  seedAdmin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
});

const app: Application = express();

// ✅ Core Middlewares
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Security Middlewares (no mongoSanitize or hpp)
app.use(helmet());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// ✅ Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later",
  })
);

// ✅ Prevent XSS attacks
app.use(xss());

// ✅ Logger (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ Test route
app.get("/", (req: Request, res: Response) => {
  res.send("API is running successfully...");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/:postId/comments", commentRoutes); // ✅ Corrected this line

// ✅ 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global error handler
app.use(errorHandler);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// ✅ Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// ✅ Graceful shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down gracefully...");
  server.close(() => process.exit(0));
});
/pakage.json file code.
{
"name": "blog_project",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "nodemon src/server.ts",
"build": "tsc",
"start": "node dist/server.js"
},
"keywords": [],
"author": "",
"license": "ISC",
"type": "commonjs",
"dependencies": {
"bcryptjs": "^3.0.2",
"cors": "^2.8.5",
"dotenv": "^17.2.1",
"dotenv-safe": "^9.1.0",
"express": "^5.1.0",
"express-mongo-sanitize": "^2.2.0",
"express-rate-limit": "^8.0.1",
"helmet": "^8.1.0",
"hpp": "^0.2.3",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.18.0",
"morgan": "^1.10.1",
"xss-clean": "^0.1.4"
},
"devDependencies": {
"@types/bcryptjs": "^2.4.6",
"@types/cors": "^2.8.19",
"@types/dotenv-safe": "^8.1.6",
"@types/express": "^5.0.3",
"@types/hpp": "^0.2.6",
"@types/jsonwebtoken": "^9.0.10",
"@types/morgan": "^1.9.10",
"@types/node": "^24.3.0",
"nodemon": "^3.1.10",
"ts-node": "^10.9.2",
"ts-node-dev": "^2.0.0",
"typescript": "^5.9.2"
}
}

/tsconfig.json

{
"compilerOptions": {
"target": "ES2020",  
 "module": "commonjs",  
 "outDir": "dist", // ✅ compiled .js files go into dist/
"rootDir": "src", // ✅ all your source code is in src/
"strict": true,  
 "esModuleInterop": true,  
 "skipLibCheck": true,
"typeRoots": ["./src/types", "./node_modules/@types"]
},
"include": ["src/**/*", "src/types/**/*.d.ts"],
"exclude": ["node_modules", "dist"]
}



























 `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📁 `src/api/axiosClient.ts`

```ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT if present
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global 401 handler
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // you could redirect to /login if you want
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
```

---

## 📁 `src/api/authApi.ts`

```ts
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/features/auth/authTypes";
import axiosClient from "./axiosClient";

const authApi = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const res = await axiosClient.post<AuthResponse>("/auth/login", data);
    return res.data;
  },
  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const res = await axiosClient.post<AuthResponse>("/auth/register", data);
    return res.data;
  },
};

export default authApi;
```

---

## 📁 `src/api/postApi.ts`

```ts
import type { Post } from "@/features/posts/postsTypes";
import axiosClient from "./axiosClient";

export const postApi = {
  getAll: async (): Promise<Post[]> => {
    const res = await axiosClient.get<Post[]>("/posts");
    return res.data;
  },
  getById: async (id: string): Promise<Post> => {
    const res = await axiosClient.get<Post>(`/posts/${id}`);
    return res.data;
  },
  create: async (payload: { title: string; content: string }): Promise<Post> => {
    const res = await axiosClient.post<Post>("/posts", payload);
    return res.data;
  },
};
```

---

## 📁 `src/api/commentApi.ts`

```ts
import type { Comment } from "@/features/comments/commentTypes";
import axiosClient from "./axiosClient";

export const commentApi = {
  list: async (postId: string): Promise<Comment[]> => {
    const res = await axiosClient.get<Comment[]>(`/comments/${postId}/comments`);
    return res.data;
  },
  add: async (postId: string, text: string): Promise<Comment> => {
    const res = await axiosClient.post<Comment>(`/comments/${postId}/comments`, { text });
    return res.data;
  },
};
```

---

## 📁 `src/app/store.ts`

```ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import postsReducer from "@/features/posts/postsSlice";
import commentsReducer from "@/features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 📁 `src/app/hooks.ts`

```ts
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

## 📁 `src/features/auth/authTypes.ts`

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
```

---

## 📁 `src/features/auth/authSlice.ts`

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import authApi from "@/api/authApi";
import type { AuthResponse, AuthState, LoginPayload, RegisterPayload } from "./authTypes";
import storage from "@/utils/storage";

const initialState: AuthState = {
  user: storage.getUser(),
  token: storage.getToken(),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.login(credentials);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Invalid credentials");
    }
  }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      return await authApi.register(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "User already registered");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      storage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        storage.setToken(action.payload.token);
        storage.setUser(action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string;
      })
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        // We do NOT auto-login; simply return success so page can redirect to /login
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

---

## 📁 `src/features/posts/postsTypes.ts`

```ts
export interface Post {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; name: string };
  createdAt: string;
  updatedAt?: string;
}
```

---

## 📁 `src/features/posts/postsSlice.ts`

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { postApi } from "@/api/postApi";
import type { Post } from "./postsTypes";

interface PostsState {
  posts: Post[];
  current?: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  current: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await postApi.getAll();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch posts");
    }
  }
);

export const fetchPostById = createAsyncThunk<Post, string>(
  "posts/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await postApi.getById(id);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch post");
    }
  }
);

export const createPost = createAsyncThunk<Post, { title: string; content: string }>(
  "posts/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await postApi.create(payload);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to create post");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchPosts.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchPosts.fulfilled, (s, a: PayloadAction<Post[]>) => {
        s.loading = false; s.posts = a.payload;
     })
     .addCase(fetchPosts.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

     .addCase(fetchPostById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchPostById.fulfilled, (s, a: PayloadAction<Post>) => {
        s.loading = false; s.current = a.payload;
     })
     .addCase(fetchPostById.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

     .addCase(createPost.fulfilled, (s, a: PayloadAction<Post>) => {
        s.posts.unshift(a.payload);
     });
  },
});

export default postsSlice.reducer;
```

---

## 📁 `src/features/comments/commentTypes.ts`

```ts
export interface Comment {
  _id: string;
  text: string;
  author: { _id: string; name: string; email?: string };
  post: string;
  createdAt: string;
}
```

---

## 📁 `src/features/comments/commentsSlice.ts`

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "./commentTypes";
import { commentApi } from "@/api/commentApi";

interface CommentsState {
  byPost: Record<string, Comment[]>;
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  byPost: {},
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk<{ postId: string; comments: Comment[] }, string>(
  "comments/fetch",
  async (postId, { rejectWithValue }) => {
    try {
      const comments = await commentApi.list(postId);
      return { postId, comments };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch comments");
    }
  }
);

export const addComment = createAsyncThunk<{ postId: string; comment: Comment }, { postId: string; text: string }>(
  "comments/add",
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const comment = await commentApi.add(postId, text);
      return { postId, comment };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to add comment");
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchComments.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchComments.fulfilled, (s, a: PayloadAction<{ postId: string; comments: Comment[] }>) => {
        s.loading = false; s.byPost[a.payload.postId] = a.payload.comments;
     })
     .addCase(fetchComments.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

     .addCase(addComment.fulfilled, (s, a: PayloadAction<{ postId: string; comment: Comment }>) => {
        const arr = s.byPost[a.payload.postId] || [];
        arr.unshift(a.payload.comment);
        s.byPost[a.payload.postId] = arr;
     });
  },
});

export default commentsSlice.reducer;
```

---

## 📁 `src/components/layout/Navbar.tsx`

```tsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">MyBlog</Link>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-700"}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-700"}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-700"}>Contact</NavLink>
          {user && <NavLink to="/create-post" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-700"}>Create</NavLink>}
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700 hidden sm:inline">{user.name}</span>
              </div>
              <Button variant="destructive" onClick={onLogout}>Logout</Button>
              <Button variant="secondary" onClick={() => navigate("/profile")}>Profile</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
```

---

## 📁 `src/components/layout/Footer.tsx`

```tsx
const Footer = () => (
  <footer className="border-t mt-10">
    <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} MyBlog. All rights reserved.
    </div>
  </footer>
);
export default Footer;
```

---

## 📁 `src/components/layout/PrivateRoute.tsx`

```tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

const PrivateRoute = () => {
  const token = useAppSelector((s) => s.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
```

---

## 📁 `src/components/posts/PostCard.tsx`

```tsx
import type { Post } from "@/features/posts/postsTypes";
import { Link } from "react-router-dom";

interface Props { post: Post; }

const PostCard = ({ post }: Props) => {
  return (
    <Link to={`/posts/${post._id}`} className="block border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span>By {post.author?.name}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  );
};
export default PostCard;
```

---

## 📁 `src/components/posts/PostList.tsx`

```tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchPosts } from "@/features/posts/postsSlice";
import PostCard from "./PostCard";

const PostList = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((s) => s.posts);

  useEffect(() => { dispatch(fetchPosts()); }, [dispatch]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid gap-4">
      {posts.map((p) => <PostCard key={p._id} post={p} />)}
    </div>
  );
};

export default PostList;
```

---

## 📁 `src/pages/Home.tsx`

```tsx
import PostList from "@/components/posts/PostList";

const Home = () => (
  <div className="mx-auto max-w-3xl mt-8">
    <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
    <PostList />
  </div>
);
export default Home;
```

---

## 📁 `src/pages/About.tsx`

```tsx
const About = () => (
  <div className="mx-auto max-w-3xl mt-8 prose">
    <h1>About</h1>
    <p>This is a simple MERN blog built with React, Redux Toolkit, and shadcn/ui.</p>
  </div>
);
export default About;
```

---

## 📁 `src/pages/Contact.tsx`

```tsx
const Contact = () => (
  <div className="mx-auto max-w-3xl mt-8 prose">
    <h1>Contact</h1>
    <p>Reach us at contact@example.com</p>
  </div>
);
export default Contact;
```

---

## 📁 `src/pages/PrivacyPolicy.tsx`

```tsx
const PrivacyPolicy = () => (
  <div className="mx-auto max-w-3xl mt-8 prose">
    <h1>Privacy Policy</h1>
    <p>We respect your privacy.</p>
  </div>
);
export default PrivacyPolicy;
```

---

## 📁 `src/pages/Terms.tsx`

```tsx
const Terms = () => (
  <div className="mx-auto max-w-3xl mt-8 prose">
    <h1>Terms & Conditions</h1>
    <p>Use this app responsibly.</p>
  </div>
);
export default Terms;
```

---

## 📁 `src/pages/Disclaimer.tsx`

```tsx
const Disclaimer = () => (
  <div className="mx-auto max-w-3xl mt-8 prose">
    <h1>Disclaimer</h1>
    <p>Information here is for educational purposes only.</p>
  </div>
);
export default Disclaimer;
```

---

## 📁 `src/pages/auth/Login.tsx` (shadcn styled + toasts + redirect)

```tsx
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loginUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type LoginForm = { email: string; password: string };

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((s) => s.auth);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => { toast.success("Login successful 🎉"); navigate("/"); })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Login to continue</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}/>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••"
                {...register("password", { required: "Password is required" })}/>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Don’t have an account?{" "}
              <button type="button" onClick={() => navigate("/register")} className="text-blue-600 hover:underline">
                Register
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default Login;
```

---

## 📁 `src/pages/auth/Register.tsx` (shadcn styled + toasts + redirect)

```tsx
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { registerUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type RegisterForm = { name: string; email: string; password: string };

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((s) => s.auth);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => { toast.success("Registration successful 🎉"); navigate("/login"); })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create account</CardTitle>
          <CardDescription className="text-center">Join our community</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name"
                {...register("name", { required: "Name is required" })}/>
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}/>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}/>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <button type="button" onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
                Login
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default Register;
```

---

## 📁 `src/pages/posts/PostDetails.tsx`

```tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchPostById } from "@/features/posts/postsSlice";
import { addComment, fetchComments } from "@/features/comments/commentsSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PostDetails = () => {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();
  const { current, loading } = useAppSelector((s) => s.posts);
  const comments = useAppSelector((s) => s.comments.byPost[id] || []);
  const { token } = useAppSelector((s) => s.auth);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchPostById(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const onAdd = () => {
    if (!token) { toast.error("Login to comment"); return; }
    if (!text.trim()) return;
    dispatch(addComment({ postId: id, text }))
      .unwrap()
      .then(() => { setText(""); toast.success("Comment added"); })
      .catch((e) => toast.error(e));
  };

  if (loading || !current) return <p className="mt-8 text-center">Loading...</p>;

  return (
    <div className="mx-auto max-w-3xl mt-8 space-y-6">
      <article className="border rounded-xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{current.title}</h1>
        <p className="text-gray-600 mt-2">By {current.author?.name}</p>
        <p className="mt-4 leading-7">{current.content}</p>
      </article>

      <section className="border rounded-xl p-6">
        <h3 className="font-semibold mb-3">Comments ({comments.length})</h3>

        <div className="flex gap-2 mb-4">
          <Input placeholder="Write a comment..." value={text} onChange={(e) => setText(e.target.value)} />
          <Button onClick={onAdd}>Send</Button>
        </div>

        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c._id} className="border rounded-lg p-3">
              <div className="text-sm text-gray-600">by {c.author?.name}</div>
              <div>{c.text}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default PostDetails;
```

---

## 📁 `src/pages/posts/CreatePost.tsx`

```tsx
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createPost } from "@/features/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormData = { title: string; content: string };

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { loading } = useAppSelector((s) => s.posts);

  const onSubmit = (data: FormData) => {
    dispatch(createPost(data))
      .unwrap()
      .then((p) => { toast.success("Post created"); navigate(`/posts/${p._id}`); })
      .catch((e) => toast.error(e));
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader><CardTitle>Create Post</CardTitle></CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Input placeholder="Title" {...register("title", { required: "Title is required" })}/>
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Textarea rows={8} placeholder="Write your content..."
                {...register("content", { required: "Content is required" })}/>
              {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>{loading ? "Publishing..." : "Publish"}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default CreatePost;
```

---

## 📁 `src/pages/profile/Profile.tsx`

```tsx
import { useAppSelector } from "@/app/hooks";

const Profile = () => {
  const { user } = useAppSelector((s) => s.auth);

  if (!user) return <p className="mt-8 text-center">Please login to view profile.</p>;

  return (
    <div className="mx-auto max-w-2xl mt-8 border rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="space-y-2 text-gray-700">
        <p><span className="font-medium">Name:</span> {user.name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        {user.role && <p><span className="font-medium">Role:</span> {user.role}</p>}
      </div>
    </div>
  );
};
export default Profile;
```

---

## 📁 `src/routes/appRoutes.tsx`

```tsx
import { lazy } from "react";
import PrivateRoute from "@/components/layout/PrivateRoute";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const Terms = lazy(() => import("../pages/Terms"));
const Disclaimer = lazy(() => import("../pages/Disclaimer"));

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

const PostDetails = lazy(() => import("../pages/posts/PostDetails"));
const CreatePost = lazy(() => import("../pages/posts/CreatePost"));
const Profile = lazy(() => import("../pages/profile/Profile"));

export const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/terms", element: <Terms /> },
  { path: "/disclaimer", element: <Disclaimer /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  { path: "/posts/:id", element: <PostDetails /> },

  // Protected routes
  { path: "/create-post", element: <PrivateRoute />, children: [{ path: "", element: <CreatePost /> }] },
  { path: "/profile", element: <PrivateRoute />, children: [{ path: "", element: <Profile /> }] },
];
```

---

## 📁 `src/types/user.ts`

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
}
```

---

## 📁 `src/types/api.ts`

```ts
export interface ApiError { message: string; status?: number }
export interface ApiResponse<T> { success?: boolean; data?: T }
export type Paginated<T> = { items: T[]; total: number; page: number; pageSize: number }
```

---

## 📁 `src/types/index.ts`

```ts
export * from "./api";
export * from "./user";
```

---

## 📁 `src/utils/storage.ts`

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
const storage = {
  setToken: (token: string) => localStorage.setItem("token", token),
  getToken: () => localStorage.getItem("token"),
  removeToken: () => localStorage.removeItem("token"),

  setUser: (user: any) => localStorage.setItem("user", JSON.stringify(user)),
  getUser: () => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },
  removeUser: () => localStorage.removeItem("user"),

  clear: () => { localStorage.removeItem("token"); localStorage.removeItem("user"); },
};

export default storage;
```

---

## 📁 `src/utils/validators.ts`

```ts
export const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const hasLettersAndNumbers = (v: string) => /[A-Za-z]/.test(v) && /\d/.test(v);
```

---

## 📁 `src/App.tsx`

```tsx
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 px-4 py-6">
          <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
            <Routes>
              {appRoutes.map((route) =>
                route.children ? (
                  <Route key={route.path} path={route.path} element={route.element}>
                    {route.children.map((c) => (
                      <Route key={`${route.path}-${c.path || "index"}`} index={!c.path} path={c.path} element={c.element} />
                    ))}
                  </Route>
                ) : (
                  <Route key={route.path} path={route.path} element={route.element} />
                )
              )}
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  );
}
export default App;
```

---

## 📁 `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---




