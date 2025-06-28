"use client";
import React from "react";
import { authentication } from "@/store/Action";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Edit = ({ model, id }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.authenticated);

  useEffect(() => {
    dispatch(authentication());
  }, []);

  return (
    <>
      {authenticated ? (
        <>
          {model == "feedback" ? (
            <Link href={`${id}`}>Feedback</Link>
          ) : (
            <Link href={`/dashboard/${model}/edit/${id}`}>Update {model}</Link>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Edit;
