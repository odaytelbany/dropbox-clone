import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex items-center flex-col lg:flex-row bg-[#2b2929] dark:bg-slate-800">
        <div className="flex p-10 flex-col bg-[#2b2929] dark:bg-slate-800 text-white space-y-5">
          {/* upper text and video  */}
          <div className="text-5xl font-bold">
            <h1>
              Welcome to Dropbox.
              <br />
              <br />
              Store every thing for you and your business needs.All in one
              place.
            </h1>
          </div>

          <p className="pb-20">
            Collaborate seamlessly and deliver work faster with Dropbox. Store
            your content, Edit PDFs, share videos, sign documents and track file
            engagement—without leaving Dropbox.
          </p>
          <Link href={"/dashboard"} className="flex w-fit bg-blue-500 p-5">
            Try it for free!
            <ArrowRightIcon className="ml-2" />
          </Link>
        </div>

        <div className="bg-[#1e1919] dark:bg-slate-800 h-full p-10">
          <video loop autoPlay muted className="rounded-lg">
            <source
              type="video/mp4"
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
            />
            Your browser does not support video tag.
          </video>
        </div>
      </div>
    </main>
  );
}
