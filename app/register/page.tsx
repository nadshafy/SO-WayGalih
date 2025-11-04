import Head from "next/head";
import AuthCard from "@/components/shared/auth-card";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Daftar - Desa Way Galih</title>
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f9] px-6">
        <AuthCard buttonLabel="Daftar dengan Google" />
      </div>
    </>
  );
}
