import { SignIn } from "@clerk/nextjs";

export default function SignInRoute() {
  return (
    <div className="-mt-24 flex items-center justify-center pb-8">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
