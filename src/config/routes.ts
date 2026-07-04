// src/config/routes.ts
export const routes = {
  home: "/",
  feed: "/feed",
  profile: (userId: string) => `/profile/${userId}`,
  login: "/login",
  signup: "/signup",
} as const;
