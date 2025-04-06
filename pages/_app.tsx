import WebLayout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/dashboard");
  const isLoginPage = router.pathname === "/login"; 

  return isLoginPage ? (
    <Component {...pageProps} /> 
  ) : isDashboard ? (
    <Component {...pageProps} /> 
  ) : (
    <WebLayout>
      <Component {...pageProps} />
    </WebLayout>
  );
}
