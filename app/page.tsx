import { LoginButtonGithub, LoginButtonGoogle } from "@/components/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Nunito } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";

const nunito = Nunito({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/chat");
  }
  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-12">
      <div className="flex flex-col lg:flex-row items-center justify-center bg-white px-6 lg:px-20 lg:py-8 pt-14 pb-10 rounded-xl">
        <Image
          src={"/illustration/login.webp"}
          alt=""
          width={280}
          height={280}
          className="block lg:mr-20 w-60 lg:w-72"
        />
        <div className="flex flex-col items-center">
          <div className="   text-center  w-[280px] px-6 rounded-xl lg:p-0">
            <h1 className={`${nunito.className} text-2xl font-bold `}>
              Welcome
            </h1>
            <p className=" text-xs text-gray-400 mb-10">
              we&apos;re exited to see you
            </p>
            <p className=" text-[10px] text-gray-900 mb-2">
              choose your login option
            </p>
            <div className="space-y-2">
              <LoginButtonGoogle />
              <div className=" w-full flex items-center text-gray-400 text-xs space-x-3 ">
                <div className="flex-1 h-[0.5px] bg-gray-400"></div>
                <span>Or</span>
                <div className="flex-1 h-[0.5px] bg-gray-400"></div>
              </div>
              <LoginButtonGithub />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
