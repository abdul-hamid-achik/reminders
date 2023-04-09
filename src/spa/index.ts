import {
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router'

import Root from '@/spa/routes/root';
import Index from '@/spa/routes/index';
import SignIn from '@/spa/routes/sign-in';
import SignUp from '@/spa/routes/sign-up';
import UserProfile from '@/spa/routes/user-profile';

const root = new RootRoute({
  component: Root,
})
export const index = new Route({
  getParentRoute: () => root,
  component: Index,
  path: '/',
})

export const signIn = new Route({
  getParentRoute: () => root,
  component: SignIn,
  path: '/sign-in',
})

export const signUp = new Route({
  getParentRoute: () => root,
  component: SignUp,
  path: '/sign-up',
})

export const userProfile = new Route({
  getParentRoute: () => root,
  component: UserProfile,
  path: '/user-profile',
})

const routeTree = root.addChildren([
  index,
  signIn,
  signUp,
  userProfile,
])
export const router = new Router({ routeTree })


declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}