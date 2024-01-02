import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-y-7 items-center">
        <h1 className="text-4xl font-heading">Sign in to <span className="font-bold text-transparent bg-gradient-to-br from-accent to-primary bg-clip-text">PicoLink </span></h1>
        <SignIn />
      </div>
    </main>
  );
}
