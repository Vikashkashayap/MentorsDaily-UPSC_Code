import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { SUPER5_BATCH_NAV_ITEMS } from "../pages/public/courses/super5BatchConfig";
import { filterNavItemsByActiveCourses } from "../pages/public/courses/courseVisibility";
import { useActiveCourseSlugs } from "../hooks/useActiveCourseSlugs";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mentorshipOpen, setMentorshipOpen] = useState(false);
  const [statePcsOpen, setStatePcsOpen] = useState(false);
  const [mobileMentorshipOpen, setMobileMentorshipOpen] = useState(false);
  const [mobileStatePcsOpen, setMobileStatePcsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoSourceIndex, setLogoSourceIndex] = useState(0);
  const [logoUnavailable, setLogoUnavailable] = useState(false);
  const closeTimeout = useRef(null);
  const mentorshipCloseTimeout = useRef(null);
  const statePcsCloseTimeout = useRef(null);
  const logoSources = ["/Logo/logo.png", "https://mentorsdaily.com/Logo/logo.png"];
  const activeLogoSrc = logoSources[Math.min(logoSourceIndex, logoSources.length - 1)];
  const activeCourseSlugs = useActiveCourseSlugs();
  const mentorshipYearItems = [
    {
      path: "/integrated-mentorship-2026",
      label: "Integrated Mentorship 2026",
      timeline: "18M",
      dotClass: "bg-blue-500",
      hoverClass: "hover:bg-blue-50 hover:text-blue-700",
      badgeClass: "bg-blue-100 text-blue-700",
      mobileAccentClass: "bg-blue-50 border-blue-100",
    },
    {
      path: "/integrated-mentorship-2027",
      label: "Integrated Mentorship 2027",
      timeline: "30M",
      dotClass: "bg-emerald-500",
      hoverClass: "hover:bg-emerald-50 hover:text-emerald-700",
      badgeClass: "bg-emerald-100 text-emerald-700",
      mobileAccentClass: "bg-emerald-50 border-emerald-100",
    },
    {
      path: "/integrated-mentorship-2028",
      label: "Integrated Mentorship 2028",
      timeline: "42M",
      dotClass: "bg-violet-500",
      hoverClass: "hover:bg-violet-50 hover:text-violet-700",
      badgeClass: "bg-violet-100 text-violet-700",
      mobileAccentClass: "bg-violet-50 border-violet-100",
    },
    {
      path: "/integrated-mentorship-2029",
      label: "Integrated Mentorship 2029",
      timeline: "54M",
      dotClass: "bg-amber-500",
      hoverClass: "hover:bg-amber-50 hover:text-amber-700",
      badgeClass: "bg-amber-100 text-amber-700",
      mobileAccentClass: "bg-amber-50 border-amber-100",
    },
    {
      path: "/integrated-mentorship-2030",
      label: "Integrated Mentorship 2030",
      timeline: "66M",
      dotClass: "bg-cyan-500",
      hoverClass: "hover:bg-cyan-50 hover:text-cyan-700",
      badgeClass: "bg-cyan-100 text-cyan-700",
      mobileAccentClass: "bg-cyan-50 border-cyan-100",
    },
    {
      path: "/integrated-mentorship-2031",
      label: "Integrated Mentorship 2031",
      timeline: "78M",
      dotClass: "bg-red-500",
      hoverClass: "hover:bg-red-50 hover:text-red-700",
      badgeClass: "bg-red-100 text-red-700",
      mobileAccentClass: "bg-red-50 border-red-100",
    },
    {
      path: "/integrated-mentorship-2032",
      label: "Integrated Mentorship 2032",
      timeline: "90M",
      dotClass: "bg-green-500",
      hoverClass: "hover:bg-green-50 hover:text-green-700",
      badgeClass: "bg-green-100 text-green-700",
      mobileAccentClass: "bg-green-50 border-green-100",
    },
  ];

  const visibleMentorshipItems = useMemo(
    () => filterNavItemsByActiveCourses(mentorshipYearItems, activeCourseSlugs),
    [activeCourseSlugs]
  );
  const visibleSuper5Items = useMemo(
    () => filterNavItemsByActiveCourses(SUPER5_BATCH_NAV_ITEMS, activeCourseSlugs),
    [activeCourseSlugs]
  );

  const uppcsYearItems = [
    {
      path: "/uppcs-mentorship",
      label: "UPPCS Mentorship 2026",
      timeline: "2026",
      dotClass: "bg-blue-500",
      hoverClass: "hover:bg-blue-50 hover:text-blue-700",
      badgeClass: "bg-blue-100 text-blue-700",
      mobileAccentClass: "bg-blue-50 border-blue-100",
    },
    {
      path: "/uppcs-mentorship-2027",
      label: "UPPCS Mentorship 2027",
      timeline: "2027",
      dotClass: "bg-indigo-500",
      hoverClass: "hover:bg-indigo-50 hover:text-indigo-800",
      badgeClass: "bg-indigo-100 text-indigo-800",
      mobileAccentClass: "bg-indigo-50 border-indigo-100",
    },
  ];

  const mppscYearItems = [
    {
      path: "/mppsc-mentorship-2027",
      label: "MPPSC Mentorship 2027",
      timeline: "2027",
      dotClass: "bg-teal-500",
      hoverClass: "hover:bg-teal-50 hover:text-teal-800",
      badgeClass: "bg-teal-100 text-teal-800",
      mobileAccentClass: "bg-teal-50 border-teal-100",
    },
  ];

  const statePcsGroups = [
    { label: "UPPCS", items: uppcsYearItems },
    { label: "MPPSC", items: mppscYearItems },
  ];

  const isStatePcsActive =
    location.pathname.startsWith("/uppcs-mentorship") ||
    location.pathname.startsWith("/mppsc-mentorship");

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
    setMobileStatePcsOpen(false);
    setStatePcsOpen(false);
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
    if (statePcsCloseTimeout.current) {
      clearTimeout(statePcsCloseTimeout.current);
    }
    setMentorshipOpen(false);
    setStatePcsOpen(false);
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
    if (statePcsCloseTimeout.current) {
      clearTimeout(statePcsCloseTimeout.current);
    }
    setResourcesOpen(false);
    setStatePcsOpen(false);
    setMentorshipOpen(true);
  };

  const handleMentorshipLeave = () => {
    mentorshipCloseTimeout.current = setTimeout(() => {
      setMentorshipOpen(false);
    }, 200);
  };

  const handleStatePcsEnter = () => {
    if (statePcsCloseTimeout.current) clearTimeout(statePcsCloseTimeout.current);
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    if (mentorshipCloseTimeout.current) clearTimeout(mentorshipCloseTimeout.current);
    setResourcesOpen(false);
    setMentorshipOpen(false);
    setStatePcsOpen(true);
  };

  const handleStatePcsLeave = () => {
    statePcsCloseTimeout.current = setTimeout(() => {
      setStatePcsOpen(false);
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

  const isMentorshipCoursesActive = location.pathname === "/mentorship-courses";
  const isPublicCurrentAffairsActive =
    location.pathname === "/current-affairs" ||
    location.pathname.startsWith("/current-affairs/");

  const handleLogoError = () => {
    setLogoSourceIndex((prev) => {
      if (prev < logoSources.length - 1) return prev + 1;
      setLogoUnavailable(true);
      return prev;
    });
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
      <div className="max-w-[88rem] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-16 gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 z-50">
            {logoUnavailable ? (
              <span className="text-xl font-bold text-blue-700 tracking-tight">MentorsDaily</span>
            ) : (
              <img
                src={activeLogoSrc}
                alt="MentorsDaily Logo"
                className="h-10 w-auto transition-transform duration-300 hover:scale-105"
                width={160}
                height={40}
                loading="eager"
                fetchPriority="high"
                onError={handleLogoError}
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center min-w-0 flex-1 justify-end xl:justify-center gap-0.5 xl:gap-1">
            <Link
              to="/mentorship-courses"
              className={`relative px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                isMentorshipCoursesActive
                  ? isDark
                    ? "text-blue-400 bg-blue-900/50 font-semibold"
                    : "text-blue-700 bg-blue-50 font-semibold"
                  : isDark
                    ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span className="2xl:hidden">UPSC Courses</span>
              <span className="hidden 2xl:inline">UPSC Mentorship Courses</span>
              {isMentorshipCoursesActive && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
              )}
            </Link>

            <Link
              to="/current-affairs"
              className={`relative px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                isPublicCurrentAffairsActive
                  ? isDark
                    ? "text-blue-400 bg-blue-900/50 font-semibold"
                    : "text-blue-700 bg-blue-50 font-semibold"
                  : isDark
                    ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Current Affairs
              {isPublicCurrentAffairsActive && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
              )}
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleResourcesEnter}
              onMouseLeave={handleResourcesLeave}
            >
              <button className={`flex items-center px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
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
                    to="/upsc-age-calculator"
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
                    UPSC Age Calculator
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
              <button className={`flex items-center px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                mentorshipOpen ||
                location.pathname.startsWith("/integrated-mentorship") ||
                location.pathname.startsWith("/super-5-batch")
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
                  {visibleMentorshipItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all duration-200 group ${
                        isDark
                          ? "text-gray-200 hover:bg-gray-700 hover:text-white"
                          : `text-gray-700 ${item.hoverClass}`
                      }`}
                    >
                      <span className="flex items-center">
                        <span className={`w-2.5 h-2.5 rounded-full mr-3 ${item.dotClass}`}></span>
                        {item.label}
                      </span>
                      
                    </Link>
                  ))}
                  {visibleSuper5Items.length > 0 ? (
                    <>
                  <div className={`my-1 border-t ${isDark ? "border-gray-700" : "border-gray-100"}`} />
                  <p
                    className={`px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Super 5 Batch
                  </p>
                  {visibleSuper5Items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all duration-200 group ${
                        isDark
                          ? "text-gray-200 hover:bg-gray-700 hover:text-white"
                          : `text-gray-700 ${item.hoverClass}`
                      }`}
                    >
                      <span className="flex items-center">
                        <span className={`w-2.5 h-2.5 rounded-full mr-3 ${item.dotClass}`}></span>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                    </>
                  ) : null}
                </div>
              )}
            </div>

            {/* State PCS: UPPCS + MPPSC */}
            <div
              className="relative"
              onMouseEnter={handleStatePcsEnter}
              onMouseLeave={handleStatePcsLeave}
            >
              <button
                type="button"
                className={`flex items-center px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                  statePcsOpen || isStatePcsActive
                    ? isDark
                      ? "text-blue-400 bg-blue-900/50 font-semibold"
                      : "text-blue-700 bg-blue-50 font-semibold"
                    : isDark
                      ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                State PCS
                <svg
                  className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${statePcsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {statePcsOpen && (
                <div
                  className={`absolute right-0 xl:left-0 xl:right-auto mt-2 w-72 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} rounded-xl shadow-2xl py-2 z-50 border backdrop-blur-md`}
                  onMouseEnter={handleStatePcsEnter}
                  onMouseLeave={handleStatePcsLeave}
                >
                  {statePcsGroups.map((group, groupIndex) => (
                    <div key={group.label}>
                      {groupIndex > 0 && (
                        <div className={`my-1 border-t ${isDark ? "border-gray-700" : "border-gray-100"}`} />
                      )}
                      <p
                        className={`px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {group.label}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                            isDark
                              ? "text-gray-200 hover:bg-gray-700 hover:text-white"
                              : `text-gray-700 ${item.hoverClass}`
                          }`}
                        >
                          <span className="flex items-center min-w-0">
                            <span className={`w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0 ${item.dotClass}`}></span>
                            <span className="truncate">{item.label}</span>
                          </span>
                          <span
                            className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0 ${item.badgeClass}`}
                          >
                            {item.timeline}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <a
              href="https://notes.mentorsdaily.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium leading-none text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              UPSC Notes
            </a>
            <a
              href="https://studentportal.mentorsdaily.com"
              className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium leading-none text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Student Portal
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
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
                {logoUnavailable ? (
                  <span className="text-lg font-bold text-blue-700 tracking-tight">MentorsDaily</span>
                ) : (
                  <img
                    src={activeLogoSrc}
                    alt="MentorsDaily Logo"
                    className="h-8 w-auto"
                    width={128}
                    height={32}
                    loading="eager"
                    onError={handleLogoError}
                  />
                )}
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
                to="/mentorship-courses"
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                📚 Mentorship Courses
              </Link>

              <Link
                to="/current-affairs"
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
                      { path: "/upsc-age-calculator", label: "UPSC Age Calculator" },
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
                    {visibleMentorshipItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg border transition-all duration-200 hover:shadow-sm ${item.mobileAccentClass}`}
                      >
                        <span className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2.5 ${item.dotClass}`}></span>
                          {item.label}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${item.badgeClass}`}>
                          {item.timeline}
                        </span>
                      </Link>
                    ))}
                    {visibleSuper5Items.length > 0 ? (
                      <>
                    <p className="px-2 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Super 5 Batch
                    </p>
                    {visibleSuper5Items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg border transition-all duration-200 hover:shadow-sm ${item.mobileAccentClass}`}
                      >
                        <span className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2.5 ${item.dotClass}`}></span>
                          {item.label}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${item.badgeClass}`}>
                          {item.timeline}
                        </span>
                      </Link>
                    ))}
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Mobile State PCS Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileStatePcsOpen((prev) => !prev)}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <span>🏛️ State PCS Programme</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${mobileStatePcsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileStatePcsOpen && (
                  <div className="ml-4 mt-1 space-y-2 bg-gray-50 rounded-lg p-2">
                    {statePcsGroups.map((group) => (
                      <div key={group.label}>
                        <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          {group.label}
                        </p>
                        <div className="space-y-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg border transition-all duration-200 hover:shadow-sm ${item.mobileAccentClass}`}
                            >
                              <span className="flex items-center min-w-0">
                                <span className={`w-2 h-2 rounded-full mr-2.5 flex-shrink-0 ${item.dotClass}`}></span>
                                <span className="truncate">{item.label}</span>
                              </span>
                              <span
                                className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0 ${item.badgeClass}`}
                              >
                                {item.timeline}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="https://notes.mentorsdaily.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-4 py-2.5 text-base font-medium leading-snug text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md mt-1.5"
              >
                UPSC Notes
              </a>
              <a
                href="https://studentportal.mentorsdaily.com"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-4 py-2.5 text-base font-medium leading-snug text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md mt-1.5"
              >
                🎓 Student Portal
              </a>
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