/* eslint-disable @typescript-eslint/no-explicit-any */
const storage = {
  setToken: (token: string) => localStorage.setItem("token", token),
  getToken: () => localStorage.getItem("token"),
  removeToken: () => localStorage.removeItem("token"),

  setUser: (user: any) => localStorage.setItem("user", JSON.stringify(user)),
  getUser: () => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },
  removeUser: () => localStorage.removeItem("user"),

  clear: () => { localStorage.removeItem("token"); localStorage.removeItem("user"); },
};

export default storage;
