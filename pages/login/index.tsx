import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, User, ShieldCheck, Eye, EyeOff, AlertTriangle } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoading(true);
    setError("");
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (username === "info@uprightkidsfoundation.org" && password === "Up@right.25") {
        document.cookie = "authToken=validToken; path=/";
        localStorage.setItem("authToken", "validToken");
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }, 500); // Small delay for better UX
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Image Section */}
      <div className="hidden lg:block lg:w-1/2 bg-blue-900 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40" 
          style={{
            backgroundImage: "url('/images/DSC_7685.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-16">
          <ShieldCheck className="w-16 h-16 text-yellow-400 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <h2 className="text-5xl font-extrabold text-yellow-400 mb-6">
            UpRightKids Foundation
          </h2>
          <p className="text-xl max-w-md leading-relaxed mb-8">
            Empowering children, transforming communities, and creating hope for a brighter future through education and support.
          </p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-blue-50 p-6">
        <Card className="w-full max-w-md bg-white shadow-2xl rounded-2xl border-2 border-blue-100">
          <CardContent className="p-10 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                Login
              </h2>
              <p className="text-gray-500">
                Enter your credentials to access the system
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded-md text-center flex items-center justify-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 pl-10 border-2 border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 pl-10 border-2 border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <Button
                className="w-full bg-blue-900 hover:bg-blue-700 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ShieldCheck className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>

            <div className="text-center">
              <a 
                href="#" 
                className="text-sm text-blue-600 hover:text-blue-800 transition duration-300 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}