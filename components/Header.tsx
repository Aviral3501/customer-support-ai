"use client";

import Link from "next/link";
import Avatar from "./Avatar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="bg-white shadow-sm flex justify-between p-5">
      <Link href={"/"} className="flex font-thin items-center text-4xl">
        {/* Logo-Avatar-Assistly */}
        <Avatar seed="AI Agent -06" className="mr-2" />

        <div>
          <h1 className="font-semibold text-black">Assistly</h1>
          <h2 className="text-sm mt-[2px] text-gray-600">
            Your Customizable AI Chat Agent
          </h2>
        </div>
      </Link>
      <div className="flex items-center justify-center p-1 space-x-4">
        <SignedIn>
          <div className="flex items-center p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition duration-200 ease-in-out shadow-md">
            <UserButton showName/>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-full transition duration-200 ease-in-out shadow-md">
            <SignInButton />
          </div>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
