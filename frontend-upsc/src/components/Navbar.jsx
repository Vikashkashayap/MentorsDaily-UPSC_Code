import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mentorshipOpen, setMentorshipOpen] = useState(false);
  const [mobileMentorshipOpen, setMobileMentorshipOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeout = useRef(null);
  const mentorshipCloseTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileResourcesOpen(false);
    setMobileMentorshipOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  const handleResourcesEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    if (mentorshipCloseTimeout.current) {
      clearTimeout(mentorshipCloseTimeout.current);
    }
    setMentorshipOpen(false);
    setResourcesOpen(true);
  };

  const handleResourcesLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setResourcesOpen(false);
    }, 200);
  };

  const handleMentorshipEnter = () => {
    if (mentorshipCloseTimeout.current) {
      clearTimeout(mentorshipCloseTimeout.current);
    }
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setResourcesOpen(false);
    setMentorshipOpen(true);
  };

  const handleMentorshipLeave = () => {
    mentorshipCloseTimeout.current = setTimeout(() => {
      setMentorshipOpen(false);
    }, 200);
  };

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const isAdmin = userData?.role === "admin" || userData?.role === "super_admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? isDark 
          ? "shadow-xl backdrop-blur-md bg-gray-900/95" 
          : "shadow-xl backdrop-blur-md bg-white/95"
        : isDark 
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-lg" 
          : "bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-lg"
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 z-50">
            <img
              src="/Logo/logo.png"
              alt="MentorsDaily Logo"
              className="h-10 w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/MentorshipCourses"
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActiveRoute("/MentorshipCourses")
                  ? isDark
                    ? "text-blue-400 bg-blue-900/50 font-semibold"
                    : "text-blue-700 bg-blue-50 font-semibold"
                  : isDark
                    ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Mentorship Courses
              {isActiveRoute("/MentorshipCourses") && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
              )}
            </Link>

            <Link
              to="/currentAffairs"
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActiveRoute("/currentAffairs")
                  ? isDark
                    ? "text-blue-400 bg-blue-900/50 font-semibold"
                    : "text-blue-700 bg-blue-50 font-semibold"
                  : isDark
                    ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Current Affairs
              {isActiveRoute("/currentAffairs") && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
              )}
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleResourcesEnter}
              onMouseLeave={handleResourcesLeave}
            >
              <button className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                resourcesOpen || location.pathname.includes("resources")
                  ? isDark
                    ? "text-blue-400 bg-blue-900/50 font-semibold"
                    : "text-blue-700 bg-blue-50 font-semibold"
                  : isDark
                    ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}>
                Resources
                <svg
                  className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {resourcesOpen && (
                <div
                  className={`absolute left-0 mt-2 w-64 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-2xl py-2 z-50 border backdrop-blur-md`}
                  onMouseEnter={handleResourcesEnter}
                  onMouseLeave={handleResourcesLeave}
                >
                  <Link
                    to="/previous-year-papers"
                    className={`flex items-center px-4 py-3 text-sm transition-all duration-200 group ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-3 transition-colors ${
                      isDark 
                        ? 'bg-gray-500 group-hover:bg-blue-400' 
                        : 'bg-gray-300 group-hover:bg-blue-600'
                    }`}></span>
                    Previous Year Papers
                  </Link>
                  <Link
                    to="/free-study-materials"
                    className={`flex items-center px-4 py-3 text-sm transition-all duration-200 group ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-3 transition-colors ${
                      isDark 
                        ? 'bg-gray-500 group-hover:bg-blue-400' 
                        : 'bg-gray-300 group-hover:bg-blue-600'
                    }`}></span>
                    Free Study Materials
                  </Link>
                  <Link
                    to="/upsc-syllabus"
                    className={`flex items-center px-4 py-3 text-sm transition-all duration-200 group ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-3 transition-colors ${
                      isDark 
                        ? 'bg-gray-500 group-hover:bg-blue-400' 
                        : 'bg-gray-300 group-hover:bg-blue-600'
                    }`}></span>
                    UPSC Syllabus
                  </Link>
                  <Link
                    to="/budget-survey"
                    className={`flex items-center px-4 py-3 text-sm transition-all duration-200 group ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-3 transition-colors ${
                      isDark 
                        ? 'bg-gray-500 group-hover:bg-blue-400' 
                        : 'bg-gray-300 group-hover:bg-blue-600'
                    }`}></span>
                    Budget & Survey
                  </Link>
                  <Link
                    to="/download-ncerts"
                    className={`flex items-center px-4 py-3 text-sm transition-all duration-200 group ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-3 transition-colors ${
                      isDark 
                        ? 'bg-gray-500 group-hover:bg-blue-400' 
                        : 'bg-gray-300 group-hover:bg-blue-600'
                    }`}></span>
                    Download NCERTs
                  </Link>
                  <Link
                    to="/preparation-blogs"
                    className={`flex items-center px-4 py-3 text-sm transition-all duration-200 group ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-3 transition-colors ${
                      isDark 
                        ? 'bg-gray-500 group-hover:bg-blue-400' 
                        : 'bg-gray-300 group-hover:bg-blue-600'
                    }`}></span>
                    UPSC Preparation Blog
                  </Link>
                </div>
              )}
            </div>

            {/* Mentorship Program Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMentorshipEnter}
              onMouseLeave={handleMentorshipLeave}
            >
              <button className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                mentorshipOpen || location.pathname.includes("mentorship")
                  ? isDark
                    ? "text-blue-400 bg-blue-900/50 font-semibold"
                    : "text-blue-700 bg-blue-50 font-semibold"
                  : isDark
                    ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}>
                Mentorship Program
                <svg
                  className={`ml-2 w-4 h-4 transition-transform duration-200 ${mentorshipOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mentorshipOpen && (
                <div
                  className={`absolute left-0 mt-2 w-72 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-2xl py-2 z-50 border backdrop-blur-md`}
                  onMouseEnter={handleMentorshipEnter}
                  onMouseLeave={handleMentorshipLeave}
                >
                  <Link
                    to="/integrated-mentorship-2026"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></span>
                    Integrated Mentorship 2026
                  </Link>
                  <Link
                    to="/integrated-mentorship-2027"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></span>
                    Integrated Mentorship 2027
                  </Link>
                  <Link
                    to="/integrated-mentorship-2028"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></span>
                    Integrated Mentorship 2028
                  </Link>
                  <Link
                    to="/integrated-mentorship-2029"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                  >
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></span>
                    Integrated Mentorship 2029
                  </Link>
                  <Link
                    to="/integrated-mentorship-2030"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></span>
                    Integrated Mentorship 2030
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/uppcs-mentorship"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
            >
               UPPCS Mentorship
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            {/* <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark 
                  ? "text-gray-300 hover:text-white hover:bg-gray-700" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button> */}

            {token && user ? (
              <>
                {/* <Link
                  to={isAdmin ? "/admin/dashboard" : "/home"}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActiveRoute(isAdmin ? "/admin/dashboard" : "/home")
                      ? isDark
                        ? "text-indigo-400 bg-indigo-900/50 font-semibold"
                        : "text-indigo-700 bg-indigo-50 font-semibold"
                      : isDark
                        ? "text-gray-300 hover:text-indigo-400 hover:bg-gray-700"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  👤 Dashboard
                </Link> */}
                {/* <button
                  onClick={handleLogout}
                  className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 ${
                    isDark
                      ? "border-blue-500 text-blue-400 hover:bg-blue-900/20"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Logout
                </button> */}
              </>
            ) : (
              <>
                {/* <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isDark
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Sign In
                </Link> */}
                {/* <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link> */}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {token && user && (
              <Link
                to={isAdmin ? "/admin/dashboard" : "/home"}
                className={`p-2 transition-colors duration-200 ${
                  isDark 
                    ? "text-gray-300 hover:text-indigo-400" 
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none transition-all duration-200 ${
                isDark 
                  ? "text-gray-300 hover:text-white hover:bg-gray-700" 
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
              }`}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900 bg-opacity-20"
            onClick={() => setMobileOpen(false)}
          ></div>
          
          {/* Menu Panel */}
          <div className={`absolute right-0 top-0 h-full w-64 max-w-[75vw] ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-2xl overflow-y-auto`}>
            <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <img src="/Logo/logo.png" alt="MentorsDaily Logo" className="h-8 w-auto" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 p-4 space-y-2">
              <Link
                to="/MentorshipCourses"
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                📚 Mentorship Courses
              </Link>

              <Link
                to="/currentAffairs"
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                📰 Current Affairs
              </Link>

              {/* Mobile Resources Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setMobileResourcesOpen((prev) => !prev)}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <span>📁 Resources</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileResourcesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileResourcesOpen && (
                  <div className="ml-4 mt-1 space-y-1 bg-gray-50 rounded-lg p-2">
                    {[
                      { path: "/previous-year-papers", label: "Previous Year Papers" },
                      { path: "/free-study-materials", label: "Free Study Materials" },
                      { path: "/upsc-syllabus", label: "UPSC Syllabus" },
                      { path: "/budget-survey", label: "Budget & Survey" },
                      { path: "/download-ncerts", label: "Download NCERTs" },
                      { path: "/preparation-blogs", label: "UPSC Preparation Blog" }
                    ].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Mentorship Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setMobileMentorshipOpen((prev) => !prev)}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <span>👥 Mentorship Program</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileMentorshipOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileMentorshipOpen && (
                  <div className="ml-4 mt-1 space-y-1 bg-gray-50 rounded-lg p-2">
                    {[
                      { path: "/integrated-mentorship-2026", label: "Integrated Mentorship 2026" },
                      { path: "/integrated-mentorship-2027", label: "Integrated Mentorship 2027" },
                      { path: "/integrated-mentorship-2028", label: "Integrated Mentorship 2028" },
                      { path: "/integrated-mentorship-2029", label: "Integrated Mentorship 2029" },
                      { path: "/integrated-mentorship-2030", label: "Integrated Mentorship 2030" }
                    ].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/uppcs-mentorship"
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
              >
                🚀 UPPCS Mentorship 2025
              </Link>
            </div>

            {/* Mobile Auth Section */}
            <div className="p-4 border-t border-gray-100">
              {token && user ? (
                <div className="space-y-3">
                  <div className="px-4 py-2 text-sm text-gray-600">
                    Welcome, <span className="font-semibold">{userData?.name || userData?.email || 'User'}</span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center px-4 py-3 text-base font-medium border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 border border-gray-300 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  {/* <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  >
                    Get Started Free
                  </Link> */}
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}