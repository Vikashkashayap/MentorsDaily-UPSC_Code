import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PAGE_NAMES } from '../../constants/pageNames';
import { ROUTES } from '../../constants/routesEnum';
import { useTheme } from '../../contexts/ThemeContext';
import { isUserAdmin, isUserSuperAdmin } from '../../utils/authUtils';

function Icon({ name, className = "h-5 w-5" }) {
  switch (name) {
    case "home":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" />
        </svg>
      );
    case "sparkles":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 3l1.8 3.6L17 8l-3.2 1.4L12 13 10.2 9.4 7 8l3.2-1.4L12 3zM4 13l.9 1.8L7 16l-2.1.9L4 19l-.9-2.1L1 16l2.1-.9L4 13z" />
        </svg>
      );
    case "globe":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2v20M4.5 5.5l15 13" />
        </svg>
      );
    case "book":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 5a2 2 0 012-2h11a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM7 7h8" />
        </svg>
      );
    case "grid":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
      );
    case "file-text":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M14 2v6h6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M8 12h8M8 16h6" />
        </svg>
      );
    case "chart":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3v18h18" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M7 14l3-3 3 3 4-5" />
        </svg>
      );
    case "help":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 18h.01M12 14a3 3 0 10-3-3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M21 12A9 9 0 113 12a9 9 0 0118 0z" />
        </svg>
      );
    case "credit-card":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197v1a6 6 0 01-6-6v-1m6 6V9a6 6 0 00-6 6v6z" />
        </svg>
      );
    default:
      return null;
  }
}



export default function Sidebar({ className = "", open: externalOpen, setOpen: setExternalOpen, collapsed: externalCollapsed, onToggle }) {
  const [internalOpen, setInternalOpen] = useState(true);
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [freeResourcesOpen, setFreeResourcesOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOpen !== undefined ? setExternalOpen : setInternalOpen;
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  // Get theme and user role
  const { isDark } = useTheme();
  const admin = isUserAdmin();
  const isSuperAdmin = isUserSuperAdmin();

  // Sidebar sections for user
  const userSections = [
    {
      title: null,
      items: [
        { to: ROUTES.USER_DASHBOARD, label: PAGE_NAMES.HOME, icon: "home" },
        { to: ROUTES.ASK_MENTORSDAILY, label: PAGE_NAMES.ASK_MENTORSDAILY, icon: "sparkles" },
        { to: ROUTES.CURRENT_AFFAIRS, label: PAGE_NAMES.CURRENT_AFFAIRS, icon: "globe" },
        { to: ROUTES.MY_LIBRARY, label: PAGE_NAMES.MY_LIBRARY, icon: "book" },
      ],
    },
    {
      title: "PRELIMS",
      items: [
        { to: ROUTES.MCQ_PRACTICE, label: PAGE_NAMES.MCQ_PRACTICE, icon: "grid" },
        { to: ROUTES.PRELIMS_PYQS, label: PAGE_NAMES.PRELIMS_PYQS, icon: "file-text" },
        { to: ROUTES.MY_TESTS, label: PAGE_NAMES.MY_TESTS, icon: "chart" },
      ],
    },
    {
      title: "MAINS",
      items: [
        { to: ROUTES.ANSWER_EVALUATION, label: PAGE_NAMES.ANSWER_EVALUATION, icon: "file-text" },
        { to: ROUTES.MAINS_PYQS, label: PAGE_NAMES.MAINS_PYQS, icon: "file-text" },
      ],
    },
  ];

  // Sidebar sections for admin
  const adminSections = [
    {
      title: null,
      items: [
        { to: ROUTES.ADMIN_DASHBOARD, label: PAGE_NAMES.ADMIN_DASHBOARD, icon: "home" },
        { to: ROUTES.ADMIN_COURSES, label: "Manage Courses", icon: "book" },
        { to: ROUTES.ADMIN_CURRENT_AFFAIRS, label: "Current Affairs", icon: "file-text" },
        { to: ROUTES.ADMIN_PREVIOUS_YEAR_PAPERS, label: "Previous Year Papers", icon: "file-text" },
        { 
          label: "Free Resources", 
          icon: "book",
          hasSubmenu: true,
          submenuItems: [
            { to: ROUTES.MANAGE_FREE_RESOURCES, label: "Study Materials" },
            { to: "/admin/preparation-blogs", label: "Preparation Blogs" },
          ]
        },
        { to: ROUTES.ADMIN_PAYMENTS, label: "Payments", icon: "credit-card" },
        { to: ROUTES.ADMIN_USERS, label: "Users", icon: "users" },
      ],
    },
  ];

  const sectionsToShow = admin ? adminSections : userSections;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside className={`fixed left-0 top-16 bottom-0 ${collapsed ? 'w-16' : 'w-64'} ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-r z-30 transform transition-all duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${className} shadow-lg`}>
        {/* mobile toggle */}
        <div className={`md:hidden flex items-center justify-end px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setOpen((s) => !s)}
            className={`p-1 rounded-md ${isDark ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label="Toggle sidebar"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <div className={`h-full overflow-y-auto ${open ? "block" : "hidden"} md:block`}>
          <div className={`px-3 py-4 md:py-5 ${collapsed ? 'md:px-2' : 'md:px-4'}`}>
            {/* sections */}
            <nav className="space-y-5">
              {sectionsToShow.map((sec, sidx) => (
                <div key={sidx}>
                  {sec.title && !collapsed && (
                    <div className={`text-xs font-bold uppercase tracking-wider mb-3 px-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {sec.title}
                    </div>
                  )}
                  <ul className="space-y-1">
                    {sec.items.map((item, idx) => (
                      <li key={item.to || idx}>
                        {item.hasSubmenu ? (
                          <div>
                            <button
                              onClick={() => setFreeResourcesOpen(!freeResourcesOpen)}
                              className={`w-full group flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                              title={collapsed ? item.label : undefined}
                            >
                              <span className={`flex-none transition-colors ${isDark ? 'text-gray-400 group-hover:text-indigo-400' : 'text-gray-500 group-hover:text-indigo-600'}`}>
                                <Icon name={item.icon} className="h-5 w-5" />
                              </span>
                              {!collapsed && (
                                <>
                                  <span className="truncate flex-1 text-left">{item.label}</span>
                                  <svg 
                                    className={`h-4 w-4 transition-transform ${freeResourcesOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </>
                              )}
                            </button>
                            {!collapsed && freeResourcesOpen && (
                              <ul className="mt-1 ml-8 space-y-1">
                                {item.submenuItems.map((subItem) => (
                                  <li key={subItem.to}>
                                    <NavLink
                                      to={subItem.to}
                                      className={({ isActive }) =>
                                        `block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                          isActive
                                            ? `${isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'}`
                                            : `${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
                                        }`
                                      }
                                    >
                                      {subItem.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                              `group flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                isActive
                                  ? `${isDark ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-indigo-600 text-white shadow-md'}`
                                  : `${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`
                              }`
                            }
                            title={collapsed ? item.label : undefined}
                          >
                            <span className={`flex-none transition-colors ${({ isActive }) => isActive ? 'text-white' : isDark ? 'text-gray-400 group-hover:text-indigo-400' : 'text-gray-500 group-hover:text-indigo-600'}`}>
                              <Icon name={item.icon} className="h-5 w-5" />
                            </span>
                            {!collapsed && <span className="truncate">{item.label}</span>}
                          </NavLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            {/* divider */}
            <div className={`border-t my-5 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
            {/* utilities */}
            <div className="flex flex-col gap-1">
              {!admin && (
                <>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `group flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                        isActive
                          ? `${isDark ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-indigo-600 text-white shadow-md'}`
                          : `${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`
                      }`
                    }
                    title={collapsed ? "Profile" : undefined}
                  >
                    <span className={`flex-none transition-colors ${isDark ? 'text-gray-400 group-hover:text-indigo-400' : 'text-gray-500 group-hover:text-indigo-600'}`}>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    {!collapsed && <span className="truncate">Profile</span>}
                  </NavLink>
                  <NavLink
                    to="/my-progress"
                    className={({ isActive }) =>
                      `group flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                        isActive
                          ? `${isDark ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-indigo-600 text-white shadow-md'}`
                          : `${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`
                      }`
                    }
                    title={collapsed ? "My Progress" : undefined}
                  >
                    <span className={`flex-none transition-colors ${isDark ? 'text-gray-400 group-hover:text-indigo-400' : 'text-gray-500 group-hover:text-indigo-600'}`}>
                      <Icon name="chart" className="h-5 w-5" />
                    </span>
                    {!collapsed && <span className="truncate">My Progress</span>}
                  </NavLink>
                  <NavLink
                    to="/help-support"
                    className={({ isActive }) =>
                      `group flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                        isActive
                          ? `${isDark ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-indigo-600 text-white shadow-md'}`
                          : `${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`
                      }`
                    }
                    title={collapsed ? "Help & Support" : undefined}
                  >
                    <span className={`flex-none transition-colors ${isDark ? 'text-gray-400 group-hover:text-indigo-400' : 'text-gray-500 group-hover:text-indigo-600'}`}>
                      <Icon name="help" className="h-5 w-5" />
                    </span>
                    {!collapsed && <span className="truncate">Help & Support</span>}
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
