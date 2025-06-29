"use client";

import { authentication } from "@/store/Action";
import { MESSAGE } from "@/store/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const authenticated = useSelector((state) => state.authenticated);
  const isLoading = useSelector((state) => state.isLoading);
  const auth_loaded = useSelector((state) => state.auth_loaded);

  useEffect(() => {
    if (!authenticated && !isLoading && auth_loaded) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "",
          status: "",
          path: `/auth/login`,
        },
      });
    }
  }, [authenticated]);

  useEffect(() => {
    dispatch(authentication());
  }, [pathname, dispatch]);
  return (
    <div>
      <aside style={{ margin: "30px 10px" }}>
        <Link href="/dashboard/post/create">Post Create</Link>
        <Link href="/dashboard/notice/create">Notice Create</Link>
        <Link href="/dashboard/gallery/create">Gallery Create</Link>
        <Link href="/dashboard/batch/create">Batch Create</Link>
        <Link href="/dashboard/student/create">Student Create</Link>
        <Link href="/dashboard/teacher/create">Teacher Create</Link>
        <Link href="/dashboard/event/create">Event Create</Link>
      </aside>
      {children}
    </div>
  );
}
