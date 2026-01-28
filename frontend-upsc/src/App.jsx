import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import MessageDisplay from "./components/utility/MessageDisplay";
import SEOPerformance from "./components/SEO/SEOPerformance";
import { ThemeProvider } from "./contexts/ThemeContext";
import { setupAxiosInterceptor } from "./api/axiosInterceptor";

export default function App() {
  useEffect(() => {
    setupAxiosInterceptor();
  }, []);

  return (
    <ThemeProvider>
      <SEOPerformance />
      <div className="app-container">
        <MessageDisplay />
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}



