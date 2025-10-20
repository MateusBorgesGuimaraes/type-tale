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
        <UserRoundIcon size={24} className="text-gray-900" />
        <ChevronDownIcon size={24} className="text-gray-900" />
      </button>

      {modalIsOpen && (
        <div
          ref={modalRef}
          id="user-modal"
          className="absolute w-3xs bg-white shadow-sm rounded-sm top-[50px] right-0 z-10"
        >
          {logged ? (
            <div className="flex items-center gap-3 p-4  bg-cyan-800 rounded-tr-sm rounded-tl-sm">
              <div>
                <Image
                  className="rounded-full"
                  src={"/mock-user.jpg"}
                  alt="user photo"
                  width={48}
                  height={48}
                />
              </div>
              <p className="text-cyan-50 text-lg font-medium">Maria Adelan</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4  bg-cyan-800 rounded-tr-sm rounded-tl-sm">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200">
                <UserRoundIcon />
              </div>
              <p className="text-cyan-50 text-lg font-medium">No user</p>
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
