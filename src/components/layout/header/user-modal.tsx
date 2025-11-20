"use client";

import {
  BookMarkedIcon,
  ChevronDownIcon,
  CompassIcon,
  LayoutDashboardIcon,
  LogInIcon,
  LogOutIcon,
  NotebookPenIcon,
  UserRoundIcon,
  UserRoundPenIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MenuItem } from "./menu-item";
import { ModalActionButton } from "./modal-action-button";
import { useAuth } from "@/hooks/use-auth";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { logoutAction } from "@/actions/auth";

export function UserModal() {
  const { user, isAuthenticated, clearAuth } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuItemsLogout = [
    { href: "/browse", icon: CompassIcon, label: "Browse" },
    { href: "/library", icon: BookMarkedIcon, label: "Library books" },
  ];

  const menuItemsLogedIn = [
    { href: "/dashboard", icon: LayoutDashboardIcon, label: "Dashboard" },
    { href: "/browse", icon: CompassIcon, label: "Browse" },
    { href: "/library", icon: BookMarkedIcon, label: "Library books" },
    { href: "/my-stories", icon: NotebookPenIcon, label: "My Stories" },
  ];

  const activeIcons = isAuthenticated ? menuItemsLogedIn : menuItemsLogout;

  async function logout() {
    clearAuth();
    try {
      await logoutAction();
    } catch (error) {
      window.location.href = "/login";
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setModalIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setModalIsOpen(!modalIsOpen)}
        className="flex items-center gap-0.5 cursor-pointer"
      >
        {isAuthenticated ? (
          <div>
            <Image
              className="rounded-full xms:w-8 xms:h-8 w-6 h-6"
              src={
                user?.avatarUrl
                  ? transformLinkImage(user?.avatarUrl)
                  : "/mock-user.jpg"
              }
              alt="user photo"
              width={48}
              height={48}
            />
          </div>
        ) : (
          <UserRoundIcon className="text-gray-900 dark:text-gray-50 xms:w-6 xms:h-6 w-5 h-5" />
        )}
        <ChevronDownIcon
          className={`text-gray-900 dark:text-gray-50 xms:w-6 xms:h-6 w-5 h-5 ${modalIsOpen && "rotate-180"} transition`}
        />
      </button>

      {modalIsOpen && (
        <div
          ref={modalRef}
          id="user-modal"
          className="absolute xms:w-3xs w-[200px] bg-white dark:bg-gray-800 shadow-sm rounded-sm top-[40px] right-0 z-10 overflow-hidden"
        >
          {isAuthenticated ? (
            <div className="flex items-center gap-3 xsm:p-4 p-3  bg-gray-400 dark:bg-gray-700 rounded-tr-sm rounded-tl-sm">
              <div>
                <Image
                  className="rounded-full xms:h-10 xms:w-10 h-9 w-9"
                  src={
                    user?.avatarUrl
                      ? transformLinkImage(user?.avatarUrl)
                      : "/mock-user.jpg"
                  }
                  alt="user photo"
                  width={48}
                  height={48}
                />
              </div>
              <p className="text-gray-50 xms:text-lg text-base font-medium">
                {user?.username}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 xsm:p-4 p-3  bg-gray-400 dark:bg-gray-700 rounded-tr-sm rounded-tl-sm">
              <div className="xms:h-10 xms:w-10 h-9 w-9 rounded-full flex items-center justify-center bg-gray-200">
                <UserRoundIcon className="text-gray-700 xms:w-6 xms:h-6 w-5 h-5" />
              </div>
              <p className="text-gray-50 xms:text-lg text-base font-medium">
                No user
              </p>
            </div>
          )}
          <ul>
            {activeIcons.map((item) => (
              <MenuItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </ul>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-4 py-2.5 hover:bg-gray-300 transition bg-gray-100 flex gap-4 items-center cursor-pointer w-full"
            >
              <LogOutIcon className="text-gray-700 xms:w-6 xms:h-6 w-5 h-5" />{" "}
              <p className="font-medium text-gray-700 text-base">Logout</p>
            </button>
          ) : (
            <ModalActionButton link="/login" icon={LogInIcon} label="Login" />
          )}
        </div>
      )}
    </>
  );
}
