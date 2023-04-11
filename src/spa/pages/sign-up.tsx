import { SignUp } from "@clerk/nextjs";

export default function SignUpRoute() {
  return (
    <div className="-mt-24 flex items-center justify-center pb-8">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
