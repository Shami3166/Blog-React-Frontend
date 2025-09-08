import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  Menu,
  Info,
  FileText,
  Phone,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ShieldCheck,
  Home,
} from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const Navbar = () => {
  const { user, role } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About", path: "/about", icon: <Info size={18} /> },
    { name: "Blogs", path: "/blogs", icon: <FileText size={18} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={18} /> },
    {
      name: "Privacy Policy",
      path: "/privacy",
      icon: <ShieldCheck size={18} />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/90 dark:bg-gray-900/90 border-b shadow-sm">
      <div className=" mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 lg:text-2xl md:text-xl sm:text-lg font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          <img
            className="w-11 sm:w-14"
            src="https://res.cloudinary.com/durzqqis6/image/upload/v1756992485/favicon-removebg-preview_edlboe.png"
            alt="logo"
          />
          <div className="flex flex-col leading-tight">
            <h1 className="text-xs sm:text-sm font-serif">Mobile & App</h1>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif">
              Guides
            </h1>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive
                    ? "text-indigo-600 font-medium dark:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-300"
                }`
              }
            >
              {link.icon} {link.name}
            </NavLink>
          ))}
          {role === "admin" && (
            <Link
              to="/create-post"
              className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
            >
              <FileText size={18} /> Create Post
            </Link>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ModeToggle />
          {!user ? (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="flex cursor-pointer items-center gap-1 text-gray-700 dark:text-gray-200"
              >
                <LogIn size={16} /> Login
              </Button>
              <Button
                className="flex cursor-pointer items-center gap-1"
                onClick={() => navigate("/register")}
              >
                <UserPlus size={16} /> Register
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-700  dark:text-gray-200 font-medium">
                  {user.name}
                </span>
              </div>
              <Button
                className="flex cursor-pointer items-center gap-1"
                onClick={() => navigate("/profile")}
              >
                <User size={16} /> Profile
              </Button>
              <Button
                variant="destructive"
                className="flex cursor-pointer items-center gap-1"
                onClick={onLogout}
              >
                <LogOut size={16} /> Logout
              </Button>
            </>
          )}
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden">
              <Menu size={22} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 flex flex-col">
            <div className="flex ml-2 justify-between items-center mb-6">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Mobile & App Guides
              </span>
              <Button
                variant="ghost"
                onClick={() => setMobileMenuOpen(false)}
                className="p-0"
              ></Button>
            </div>

            <nav className="flex ml-2 flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-lg ${
                      isActive
                        ? "text-indigo-600 font-medium dark:text-indigo-400"
                        : "text-gray-700 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-300"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon} {link.name}
                </NavLink>
              ))}
              {role === "admin" && (
                <Link
                  to="/create-post"
                  className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText size={18} /> Create Post
                </Link>
              )}
            </nav>

            <div className="flex ml-2 flex-col gap-3 mt-auto">
              <ModeToggle />
              {!user ? (
                <>
                  <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/login");
                    }}
                  >
                    <LogIn size={16} /> Login
                  </Button>
                  <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/register");
                    }}
                  >
                    <UserPlus size={16} /> Register
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-gray-700 font-medium dark:text-gray-200">
                      {user.name}
                    </span>
                  </div>
                  <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/profile");
                    }}
                  >
                    <User size={16} /> Profile
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-1"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                  >
                    <LogOut size={16} /> Logout
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
