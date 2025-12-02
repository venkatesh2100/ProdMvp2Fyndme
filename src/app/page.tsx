"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
//? use this one to redirect wihtout my image!!
// import { redirect } from "next/navigation";
//redicrect('/admin-dashboard');
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin-dashboard");
  }, [router]);

  return (
    <div className="text-center flex flex-col justify-center  items-center p-6 min-h-screen font-bold text-2xl">
      Redirecting...
    <div >
      <Image
      src='/profile.png'
      width={100}
      height={100}
      alt="Redirecting Image"
      className="mx-auto rounded-full items-center mb-4"
      />
    </div>
    </div>
  );
}
