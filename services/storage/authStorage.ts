// services/storage/authStorage.ts
export const getToken = () => localStorage.getItem("btToken");

export const setToken = (token: string) => {
  localStorage.setItem("btToken", token);
};

export const removeToken = () => localStorage.removeItem("btToken");
