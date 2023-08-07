"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { LayoutContainer, LayoutRoot } from "./styled";

const NormalDiv = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const LayoutDiv = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );
  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};

const OutputDiv = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (
    pathname.indexOf("auth/signin") > -1 ||
    pathname.indexOf("auth/signup") > -1
  ) {
    return <NormalDiv>{children}</NormalDiv>;
  } else {
    return <LayoutDiv>{children}</LayoutDiv>;
  }
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  if (
    !user?.userId &&
    pathname.indexOf("auth/signin") === -1 &&
    pathname.indexOf("auth/signup") === -1
  ) {
    router.push("auth/signin");
    return null;
  }

  return <OutputDiv>{children}</OutputDiv>;
};

export default AuthGuard;
