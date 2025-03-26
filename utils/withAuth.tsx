import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("authToken"); // Check token in localStorage

      if (!token) {
        router.replace("/login"); // Redirect if not authenticated
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) return <p>Loading...</p>; // Show loading while checking auth

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
