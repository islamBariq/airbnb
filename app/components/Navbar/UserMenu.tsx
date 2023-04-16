"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avater";
import {  useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import useRentModal from "@/app/hooks/useRentModal";

import { signOut } from "next-auth/react";
const UserMenu = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const user = useCurrentUser((state) => state.user);

  const onRent = useCallback(() => {
    if(!user) {
      // return loginModal.onOpen()
    }
    rentModal.onOpen()

  },[user,loginModal])
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);


  return (
    <div className='relative'>
      <div
        className='
            flex flex-row items-center gap-3
            '
      >
        <div
          onClick={onRent}
          className='
          hidden md:block text-sm
          font-semibold
          py-3
          px-4
          rounded-full
          hover:bg-neutral-100
          transition
          cursor-pointer
        '
        >
          Airbnb your home
        </div>
        <div
          className='
      p-4
      md:py-1
      md:px-2
      border-[1px]
      border-neutral-200
      flex
      flex-row
      items-center
      gap-3
      rounded-full
      cursor-pointer
      hover:shadow-sm
      transition
      '
        >
          <button onClick={toggleOpen}>
            <AiOutlineMenu />
          </button>
          <div className='hidden md:block'>
            <Avatar  src={user?.image} />
          </div>
        </div>
      </div>
      <div
        className='absolute rounded-xs
       shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden
       right-0
       top-12
       text-sm
       '
      >
        {isOpen && (
          <div className='flex flex-col cursor cursor-pointer'>
            {user ? (
              <>
                <MenuItem onClick={() => {}} label='My trips' />
                <MenuItem onClick={() => {}} label='My favorites' />{" "}
                <MenuItem onClick={() => {}} label='My reservations' />{" "}
                <MenuItem onClick={() => {}} label='My properties' />
                <MenuItem onClick={onRent} label='Airbnb my home' />
                <hr />
                <MenuItem onClick={() => signOut()} label='Sign out' />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    loginModal.onOpen();
                    toggleOpen();
                  }}
                  label='Login'
                />
                <MenuItem
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    registerModal.onOpen();
                    toggleOpen();
                  }}
                  label='Sign up'
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
