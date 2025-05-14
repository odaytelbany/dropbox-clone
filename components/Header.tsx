import React from "react";
import Image from "next/image";
import Link from "next/link";
import {UserButton, SignedOut, SignInButton} from '@clerk/nextjs';
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-[#0160fe] w-fit">
            <Image
              src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
              alt="dropbox-logo"
              className="invert"
              height={50}
              width={50}
            />
        </div>
        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>
      <div className="flex items-center space-x-2 px-5">
        {/* theme toggler */}
        <ThemeToggler />
        <UserButton afterSignOutUrl="/"/>
        <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal"/>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
