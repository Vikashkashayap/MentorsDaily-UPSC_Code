import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../api/coreService";
import { dataHandler } from "../../../utils/dataHandler";
import { ROUTES } from "../../../constants/routesEnum";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required.";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) e.email = "Enter a valid email.";
    }
    if (!form.password) e.password = "Password is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    
    const result = await dataHandler.handleApiCall(
      () => login({ email: form.email, password: form.password }),
      {
        successMessage: "Login successful!",
        errorMessage: "Login failed. Please check your credentials."
      }
    );

    if (result.status === "success" && result.data) {
      const actualData = result.data.data || result.data;
      
      if (actualData?.token) {
        if (form.remember) localStorage.setItem("token", actualData.token);
        else sessionStorage.setItem("token", actualData.token);
      }
      
      if (actualData) {
        const userData = dataHandler.formatUserData(actualData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        if (userData.isAdmin) {
          navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
        } else {
          navigate(ROUTES.USER_DASHBOARD, { replace: true });
        }
      } else {
        setServerError("Invalid response from server");
      }
    } else {
      setServerError(result.message || "Login failed. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/90 to-slate-900"></div>
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
      <div className="hidden sm:block absolute top-1/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-float animation-delay-1000 opacity-40"></div>
      <div className="hidden sm:block absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-300 rounded-full animate-float animation-delay-2000 opacity-30"></div>
      <div className="hidden sm:block absolute top-1/2 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-float animation-delay-1500 opacity-50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        <div className="hidden lg:flex flex-col justify-center space-y-8 lg:space-y-12 px-4 lg:px-8 animate-fade-in">
          <div className="space-y-6 lg:space-y-8">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="relative group">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 transform group-hover:scale-105 transition-all duration-300">
                  <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.9"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="absolute -inset-2 bg-blue-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
                  MentorsDaily
                </h1>
                <p className="text-lg lg:text-xl text-blue-200 font-medium mt-2 lg:mt-3 tracking-wide">Your Gateway to UPSC Excellence</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 lg:space-y-6 mt-4 lg:mt-8">
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="relative flex items-start space-x-4 lg:space-x-6 bg-white/5 backdrop-blur-xl p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg lg:text-xl mb-2 lg:mb-3">Expert Mentorship</h3>
                  <p className="text-blue-100/80 leading-relaxed text-sm lg:text-base">Learn from UPSC toppers and experienced mentors with proven track records</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="relative flex items-start space-x-4 lg:space-x-6 bg-white/5 backdrop-blur-xl p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-indigo-500/20">
                <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-indigo-500 to-purple-400 rounded-2xl flex items-center justify-center transform group-hover:-rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-500/25">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg lg:text-xl mb-2 lg:mb-3">Smart Study Material</h3>
                  <p className="text-blue-100/80 leading-relaxed text-sm lg:text-base">AI-curated resources and personalized learning paths for optimal preparation</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="relative flex items-start space-x-4 lg:space-x-6 bg-white/5 backdrop-blur-xl p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-cyan-500/25">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg lg:text-xl mb-2 lg:mb-3">Progress Analytics</h3>
                  <p className="text-blue-100/80 leading-relaxed text-sm lg:text-base">Track performance with detailed insights and adaptive learning recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="relative group">
            <div className="bg-white/10 backdrop-blur-2xl shadow-2xl rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-white/20 relative overflow-hidden transform group-hover:scale-105 transition-all duration-700">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-2xl lg:rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl lg:rounded-3xl"></div>
              <div className="relative z-10">
                <div className="lg:hidden flex flex-col items-center justify-center space-y-4 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.9"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h1 className="text-2xl font-black bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      MentorsDaily
                    </h1>
                  </div>
                  <p className="text-blue-200 text-center text-sm font-medium">Your Gateway to UPSC Excellence</p>
                </div>
                
                <div className="text-center lg:text-left mb-6 lg:mb-10">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-3 lg:mb-4 leading-tight">
                    Welcome Back
                  </h2>
                  <p className="text-blue-100/80 text-base lg:text-lg font-medium">Continue your journey to UPSC success</p>
                </div>
                
                {serverError && (
                  <div className="mb-6 lg:mb-8 flex items-start space-x-3 text-sm bg-red-500/20 backdrop-blur-lg border border-red-400/30 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-white text-xs lg:text-sm">{serverError}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                  <div className="space-y-3 lg:space-y-4">
                    <label className="block text-xs font-bold text-white/90 uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 lg:h-5 lg:w-5 text-blue-300/70 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 lg:pl-12 pr-4 lg:pr-6 py-4 lg:py-5 border-2 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 backdrop-blur-lg font-medium ${
                          errors.email 
                            ? "border-red-400/50 bg-red-500/10 focus:border-red-400 focus:ring-red-400/20" 
                            : "border-white/10 bg-white/5 hover:border-white/20 focus:border-cyan-400/50 focus:ring-cyan-400/20"
                        } text-white placeholder-blue-200/50 text-sm lg:text-base`}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs lg:text-sm text-red-300 mt-1 lg:mt-2 flex items-center space-x-1 lg:space-x-2 font-medium">
                        <svg className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3 lg:space-y-4">
                    <label className="block text-xs font-bold text-white/90 uppercase tracking-wide">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 lg:h-5 lg:w-5 text-blue-300/70 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className={`block w-full pl-10 lg:pl-12 pr-4 lg:pr-6 py-4 lg:py-5 border-2 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 backdrop-blur-lg font-medium ${
                          errors.password 
                            ? "border-red-400/50 bg-red-500/10 focus:border-red-400 focus:ring-red-400/20" 
                            : "border-white/10 bg-white/5 hover:border-white/20 focus:border-cyan-400/50 focus:ring-cyan-400/20"
                        } text-white placeholder-blue-200/50 text-sm lg:text-base`}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs lg:text-sm text-red-300 mt-1 lg:mt-2 flex items-center space-x-1 lg:space-x-2 font-medium">
                        <svg className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.password}</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="relative">
                      <input
                        name="remember"
                        type="checkbox"
                        checked={form.remember}
                        onChange={handleChange}
                        className="h-5 w-5 lg:h-6 lg:w-6 text-cyan-400 border-2 border-white/20 bg-white/5 rounded-lg focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400 cursor-pointer transition-all"
                        id="remember"
                      />
                    </div>
                    <label htmlFor="remember" className="text-white/80 font-medium cursor-pointer select-none text-sm lg:text-base">
                      Keep me signed in
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center px-6 lg:px-8 py-4 lg:py-5 rounded-xl lg:rounded-2xl text-white font-bold text-base lg:text-lg shadow-2xl transform transition-all duration-500 group relative overflow-hidden ${
                      loading
                        ? "bg-gray-500/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 hover:shadow-3xl hover:shadow-cyan-500/30 hover:-translate-y-1 active:translate-y-0"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Continue Journey
                        <svg className="ml-2 lg:ml-3 w-5 h-5 lg:w-6 lg:h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
                <div className="lg:hidden mt-6 pt-6 border-t border-white/10">
                  <div className="text-center space-y-3">
                    <p className="text-blue-200/70 text-sm">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                        Sign up
                      </Link>
                    </p>
                    <Link to="/forgot-password" className="text-blue-200/70 text-sm hover:text-cyan-400 transition-colors block">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .hover\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}