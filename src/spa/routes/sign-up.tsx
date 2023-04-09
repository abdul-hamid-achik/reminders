import { SignUp } from "@clerk/nextjs";

export default function SignUpRoute() {
  return (
    <div className="flex items-center justify-center">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
