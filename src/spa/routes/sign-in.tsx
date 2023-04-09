import { SignIn } from '@clerk/nextjs'
export default function SignInRoute() {
  return <div>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>;
}