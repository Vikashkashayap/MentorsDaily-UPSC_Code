import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import MessageDisplay from "../utility/MessageDisplay";
import SEOHead from "../SEO/SEOHead";
import { useTheme } from "../../contexts/ThemeContext";

export default function MainLayout({
  children,
  showSidebar = true,
  showNavbar = true,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  // Check if user is authenticated
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/login", { replace: true });
      return;
    }

    // Check role-based access
    try {
      const userData = JSON.parse(user);
      const currentPath = location.pathname;
      // Define admin-only routes
      const adminRoutes = ["/admin"]; // All admin routes start with /admin

      const role = userData.role;
      const isAdmin = role === "admin" || role === "super_admin";

      if (currentPath.startsWith("/admin") && !isAdmin) {
        alert("You are not permitted to access this page");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login", { replace: true });
    }
  }, [navigate, location.pathname]);

  // Close sidebar on route change for mobile screens
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768; // md breakpoint
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // Keyboard shortcut for sidebar toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + B to toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarCollapsed(!sidebarCollapsed);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarCollapsed]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <SEOHead pathname={location.pathname} />
      <MessageDisplay />
      
      {/* Top Navbar - Full Width */}
      {showNavbar && (
        <div className={`sticky top-0 z-50 w-full ${isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur supports-[backdrop-filter]:${isDark ? 'bg-gray-800/60' : 'bg-white/60'} border-b shadow-sm`}>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Left side - Toggle buttons */}
              <div className="flex items-center gap-2">
                {showSidebar && (
                  <>
                    {/* Mobile menu button */}
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className={`md:hidden inline-flex items-center justify-center p-2 rounded-md ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      aria-label="Open sidebar"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                    
                    {/* Desktop toggle button */}
                    <button
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className={`hidden md:inline-flex items-center justify-center p-2 rounded-md ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                      aria-label="Toggle sidebar"
                      title={`${sidebarCollapsed ? 'Expand' : 'Collapse'} sidebar (Ctrl+B)`}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Center - Logo */}
              <div className="flex-1 flex justify-center md:justify-start md:ml-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 focus:outline-none"
                  aria-label="Go to home"
                >
                  <img
                    src="/Logo/logo.png"
                    alt="Mentors Daily"
                    className="h-8 w-auto select-none"
                  />
                </button>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2 md:gap-3">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`inline-flex items-center justify-center p-2 rounded-md ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                  aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                  title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                >
                  {isDark ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                {/* Mobile logout icon */}
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    sessionStorage.removeItem("token");
                    navigate("/");
                  }}
                  className={`md:hidden inline-flex items-center justify-center p-2 rounded-md ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-red-500`}
                  aria-label="Logout"
                  title="Logout"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>

                {/* Desktop logout button */}
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    sessionStorage.removeItem("token");
                    navigate("/");
                  }}
                  className={`hidden md:inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${isDark ? 'text-gray-300 ring-gray-600 hover:bg-gray-700 hover:text-white' : 'text-gray-700 ring-gray-300 hover:bg-gray-100 hover:text-gray-900'} ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <Sidebar 
          open={sidebarOpen} 
          setOpen={setSidebarOpen}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          showSidebar 
            ? sidebarCollapsed 
              ? "md:ml-16" 
              : "md:ml-64" 
            : ""
        }`}
      >
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        {/* {showFooter && <Footer />} */}
      </div>
    </div>
  );
}
