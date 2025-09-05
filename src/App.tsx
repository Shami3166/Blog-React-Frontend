import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { Toaster } from "@/components/ui/sonner";




function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        {/* ✅ Navbar always visible */}
        <Navbar />

        {/* ✅ Main content */}
        <main className="flex-1 px-4 py-6">
          <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
            <Routes>
              {appRoutes.map((route) =>
                route.children ? (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  >
                    {route.children.map((c) => (
                      <Route
                        key={`${route.path}-${c.path || "index"}`}
                        index={!c.path}
                        path={c.path}
                        element={c.element}
                      />
                    ))}
                  </Route>
                ) : (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                )
              )}
            </Routes>
          </Suspense>
        </main>

        {/* ✅ Toasts appear above footer */}
        <Toaster position="bottom-right" richColors />

        {/* ✅ Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
