import { lazy, Suspense, useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { setupAxiosInterceptor } from "./api/axiosInterceptor";
import RouteSkeleton from "./components/utility/RouteSkeleton";

const SEOPerformance = lazy(() => import("./components/SEO/SEOPerformance"));

export default function App() {
  const [showNonCriticalUI, setShowNonCriticalUI] = useState(false);

  useEffect(() => {
    setupAxiosInterceptor();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowNonCriticalUI(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {showNonCriticalUI && (
        <Suspense fallback={null}>
          <SEOPerformance />
        </Suspense>
      )}
      <div className="app-container">
        <Suspense fallback={<RouteSkeleton />}>
          <AppRoutes />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}



