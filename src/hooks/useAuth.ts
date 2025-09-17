import { useQuery } from "@tanstack/react-query";

async function fetchUser(): Promise<any> {
  const response = await fetch("/api/auth/user", {
    credentials: "include",
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      // User is not authenticated
      return null;
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: fetchUser,
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}