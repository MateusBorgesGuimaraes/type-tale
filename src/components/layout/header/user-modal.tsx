"use client";

import {
  BookMarkedIcon,
  ChevronDownIcon,
  CompassIcon,
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

export function UserModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const logged = true;

  const menuItemsLogout = [
    { href: "/browse", icon: CompassIcon, label: "Browse" },
    { href: "/library", icon: BookMarkedIcon, label: "Library books" },
  ];

  const menuItemsLogedIn = [
    { href: "/me", icon: UserRoundPenIcon, label: "User Profile" },
    { href: "/browse", icon: CompassIcon, label: "Browse" },
    { href: "/library", icon: BookMarkedIcon, label: "Library books" },
    { href: "/my-stories", icon: NotebookPenIcon, label: "My Stories" },
  ];

  const activeIcons = logged ? menuItemsLogedIn : menuItemsLogout;

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
        <UserRoundIcon className="text-gray-900 dark:text-gray-50 xms:w-6 xms:h-6 w-5 h-5" />
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
          {logged ? (
            <div className="flex items-center gap-3 xsm:p-4 p-3  bg-gray-400 dark:bg-gray-700 rounded-tr-sm rounded-tl-sm">
              <div>
                <Image
                  className="rounded-full xms:h-10 xms:w-10 h-9 w-9"
                  src={"/mock-user.jpg"}
                  alt="user photo"
                  width={48}
                  height={48}
                />
              </div>
              <p className="text-gray-50 xms:text-lg text-base font-medium">
                Maria Adelan
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
          {logged ? (
            <ModalActionButton icon={LogOutIcon} label="Logout" />
          ) : (
            <ModalActionButton icon={LogInIcon} label="Login" />
          )}
        </div>
      )}
    </>
  );
}
