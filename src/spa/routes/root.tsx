import {
  Outlet,
  Link
} from '@tanstack/react-router'

export default function RootRoute() {
  return <>
    <Link to="/">Home</Link>
    <Link to="/sign-in">Sign In</Link>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/user-profile">User Profile</Link>
    <Outlet />
  </>;
}