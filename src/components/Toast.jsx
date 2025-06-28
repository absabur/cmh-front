"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE, CLEAR_PATH } from "@/store/constant";
import { Toaster, toast } from "sonner";

const Toast = () => {
  const pathname = usePathname();
  const message = useSelector((state) => state.message);
  const path = useSelector((state) => state.path);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (message?.status) {
      toast[message?.status || "info"](message?.message);
      dispatch({ type: CLEAR_MESSAGE });
    }

    if (path) {
      dispatch({ type: CLEAR_PATH });
      router.push(path, { scroll: false });
    }
  }, [message, path]);

  return <Toaster richColors position="top-right" />;
};

export default Toast;
