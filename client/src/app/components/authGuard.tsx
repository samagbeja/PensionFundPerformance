"use client";
import { usePathname, useRouter } from "next/navigation";

import { useSelector } from "react-redux";

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

  return <>{children}</>;
};

export default AuthGuard;
