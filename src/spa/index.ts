import { lazy, RootRoute, Route, Router } from "@tanstack/react-router";

const root = new RootRoute({
  component: lazy(() => import("@/spa/pages/root")),
});

export const index = new Route({
  getParentRoute: () => root,
  component: lazy(() => import("@/spa/pages/index")),
  path: "/",
});

export const signIn = new Route({
  getParentRoute: () => root,
  component: lazy(() => import("@/spa/pages/sign-in")),
  path: "/sign-in",
});

export const signUp = new Route({
  getParentRoute: () => root,
  component: lazy(() => import("@/spa/pages/sign-up")),
  path: "/sign-up",
});

export const userProfile = new Route({
  getParentRoute: () => root,
  component: lazy(() => import("@/spa/pages/user-profile")),
  path: "/user-profile",
});

export const dashboard = new Route({
  getParentRoute: () => root,
  component: lazy(() => import("@/spa/pages/dashboard")),
  path: "/dashboard",
});

const routeTree = root.addChildren([
  index,
  signIn,
  signUp,
  userProfile,
  dashboard,
]);

export const router = new Router({
  routeTree,
  loadComponent: async (component) => {
    if (component.preload) {
      await component.preload();
    }
    return component;
  },
});

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
