/** @format */
"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Bell from "../../icons/bell";
import Message from "../../icons/message";
import LanguageSwitch from "../../language-switch";
import Account from "../../profile-account";
import SearchBar from "../../search-bar";
import { ModeToggle } from "../../theme/mode-togle";
import LogOut from "../../icons/log-out";
import { logout } from "@/feature/profile/services/profile-service";
import { useRouter } from "next/navigation";

export const Header = ({ className = "" }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const removeCookies = async () => {
    const response = await logout();

    if (response.success) {
      router.push("/login");
    }
  };

  return (
    <>
      <header
        className={`bg-whitedark:bg-zinc-950 dark:text-white shadow border ${className} `}>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <div className="relative w-11 h-11">
              <Link href={"/home"}>
                <Image
                  className="dark:bg-white border rounded-full cursor-pointer"
                  src={
                    theme === "dark"
                      ? "/image/logo/fcbke-drkmd.png"
                      : "/image/logo/facebook-color.svg"
                  }
                  layout="fill"
                  alt="Facebook logo"
                />
              </Link>
            </div>
            <div>
              <SearchBar />
            </div>
          </div>
          <nav>
            <ul className="flex items-center gap-x-7">
              <li>
                <LanguageSwitch />
              </li>
              <li>
                <ModeToggle />
              </li>
              <li></li>
              <li>
                <Message />
              </li>
              <li>
                <Bell />
              </li>
              <li>
                <Link href="/profile/0">
                  <Account />
                </Link>
              </li>
              <li>
                {/* href="/login" */}
                {/* <Link>
                </Link> */}
                <button onClick={removeCookies}>
                  <LogOut />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
