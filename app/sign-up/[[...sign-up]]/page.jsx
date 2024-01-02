import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-y-7 items-center">
        <h1 className="text-2xl text-center md:text-4xl font-heading">Create a new Account on <span className="font-bold text-transparent bg-gradient-to-br from-accent to-primary bg-clip-text">PicoLink </span></h1>
        <SignUp />
      </div>
    </main>
  );
}
