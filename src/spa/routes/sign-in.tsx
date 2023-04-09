import { SignIn } from "@clerk/nextjs";

export default function SignInRoute() {
  return (
    <div className="flex items-center justify-center">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
