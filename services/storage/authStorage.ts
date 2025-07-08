// services/storage/authStorage.ts
import Cookies from "js-cookie";

const TOKEN_KEY = "btToken";

// Client-side token access
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return Cookies.get(TOKEN_KEY) || null;
};

export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;

  Cookies.set(TOKEN_KEY, token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};

export const clearToken = (): void => {
  if (typeof window === "undefined") return;

  Cookies.remove(TOKEN_KEY, {
    path: "/",
  });
};

// Server-side token access (for middleware/API routes)
export const getTokenFromRequest = (request: {
  cookies: {
    get: (key: string) => { value: string } | undefined;
  };
}): string | null => {
  return request.cookies.get(TOKEN_KEY)?.value ?? null;
};
