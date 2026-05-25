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
    const show = () => setShowNonCriticalUI(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(show, { timeout: 1800 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(show, 400);
    return () => window.clearTimeout(t);
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



