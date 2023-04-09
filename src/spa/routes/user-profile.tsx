import { UserProfile } from "@clerk/nextjs";

export default function UserProfileRoute() {
  return (
  <UserProfile path="/user-profile" routing="path" />
);}
