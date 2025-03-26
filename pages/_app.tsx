import WebLayout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/dashboard");
  const isLoginPage = router.pathname === "/login"; // Check if it's the login page

  return isLoginPage ? (
    <Component {...pageProps} /> // Render only the component for login page without WebLayout
  ) : isDashboard ? (
    <Component {...pageProps} /> // Render component for dashboard (if needed)
  ) : (
    <WebLayout>
      <Component {...pageProps} />
    </WebLayout>
  );
}
