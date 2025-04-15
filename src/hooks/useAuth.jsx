// hooks/useAuth.ts
import { useEffect, useState, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to fetch user data
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/check-auth");

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      setUser(data.userData);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setUser(null); // Ensure user is null on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to trigger a refresh of auth state
  const refresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, refreshTrigger]); // Add refreshTrigger as a dependency

  return { user, loading, error, refresh };
}