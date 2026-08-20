import { createContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { useFavoritesStore } from "../store/favoritesStore.ts";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loadFavorites = useFavoritesStore((state) => state.load);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return undefined;
    }

    let isMounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session);
        loadFavorites(data.session?.user?.id ?? null);
        setIsLoading(false);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      loadFavorites(nextSession?.user?.id ?? null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [loadFavorites]);

  const value = useMemo(() => ({
    session,
    user: session?.user ?? null,
    isLoading,
    isConfigured: isSupabaseConfigured,
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signUp: (email, password, name) => supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    }),
    resetPassword: (email) => supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    }),
    signOut: () => supabase.auth.signOut(),
  }), [isLoading, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
