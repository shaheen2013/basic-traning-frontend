// services/storage/authStorage.ts
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("btToken");
  }
  return null;
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("btToken", token);
  }
  return null;
};

export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("btToken");
  }
  return null;
};
