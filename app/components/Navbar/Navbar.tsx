"use client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { useEffect } from "react";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const setUser = useCurrentUser((state) => state.setUser);
  const user = useCurrentUser((state) => state.user);
  useEffect(() => {
    if (currentUser) setUser(currentUser);
  }, [currentUser, setUser]);

  return (
    <div className='fixed w-full shadow-sm z-10 bg-white'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
        <Categories />
      </div>
    </div>
  );
};

export default Navbar;
