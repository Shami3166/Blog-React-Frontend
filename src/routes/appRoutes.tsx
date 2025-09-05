import { lazy } from "react";
import PrivateRoute from "@/components/layouts/PrivateRoute";
const Blog = lazy(() => import("../pages/BLog"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const Terms = lazy(() => import("../pages/Terms"));
const Disclaimer = lazy(() => import("../pages/Disclaimer"));

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

const PostDetails = lazy(() => import("../pages/posts/PostDetails"));
const Profile = lazy(() => import("../pages/profile"));
const CreatePost = lazy(() => import("../pages/posts/CreatePost"));
const EditPost = lazy(() => import("../pages/posts/EditPost"));
const Home = lazy(() => import("../pages/Home"));

export const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/blogs", element: <Blog /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/terms", element: <Terms /> },
  { path: "/disclaimer", element: <Disclaimer /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  { path: "/posts/:id", element: <PostDetails /> },
  {
    path: "/profile",
    element: <PrivateRoute />,
    children: [{ path: "", element: <Profile /> }],
  },
  {
    path: "/create-post",
    element: <PrivateRoute />,
    children: [{ path: "", element: <CreatePost /> }],
  },
  {
    path: "/edit-post/:id",
    element: <PrivateRoute />,
    children: [{ path: "", element: <EditPost /> }],
  },
];
