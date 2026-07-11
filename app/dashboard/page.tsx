import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";


export default async function Dashboard() {
    await auth.protect();
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#0B0714] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <div>
            <h1 className="text-xl font-bold">Your Dashboard</h1>
            <p className="text-sm text-white/50">
              Manage your link-in-bio page
            </p>
          </div>
          <UserButton/>
        </div>

        {/* placeholder for link management UI */}
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/40">
          No links added yet — link form goes here.
        </div>
      </div>
    </main>
  );
}
