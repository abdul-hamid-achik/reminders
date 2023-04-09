import { SignUp } from '@clerk/nextjs'
export default function SignUpRoute() {
  return <div>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>;
}