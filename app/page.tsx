import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex overflow-hidden flex-col justify-between items-center p-24 min-h-screen">
      <h1>
        INI BUAT LANDING PAGE OKEEE!!
      </h1>
    </main>
  );
}
