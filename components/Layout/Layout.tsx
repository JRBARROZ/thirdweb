import React from "react";
import Intro from "./Intro";
import { ILayoutProps } from "./types";

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Intro />
      <main className="mt-8 flex flex-col justify-center max-w-7xl p-2 m-auto text-white">
        {children}
      </main>
    </>
  );
}
