"use client";

import { authentication } from "@/store/Action";
import { MESSAGE } from "@/store/constant";
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
    if (authenticated && !isLoading && auth_loaded) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "",
          status: "",
          path: `/dashboard`,
        },
      });
    }
  }, [authenticated]);

  useEffect(() => {
    dispatch(authentication());
  }, [pathname, dispatch]);

  return <div>{children}</div>;
}
