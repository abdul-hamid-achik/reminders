import { UserProfile } from "@clerk/nextjs";

export default function UserProfileRoute() {
  return (
    <div className="-mt-24 flex items-center justify-center pb-8">
      <UserProfile path="/user-profile" routing="path" />
    </div>
  );
}
