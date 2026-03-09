import React from "react";
import DarkMode from "./DarkMode";
import TodosDone from "./TodosDone";
import { useProgressMenu } from "~/context/ProgressMenuContext";
import useScreenMedia from "~/hook/useScreenMedia";
import Logo from "../Logo";

const ProgressMenu: React.FC = () => {
  const { isProgressMenuOpen, closeProgressMenu } = useProgressMenu();

  const mediaQueries = useScreenMedia();

  return (
    <>
      <div
        className={`bg-slate-100 h-screen w-60 xl:w-2/12 fixed dark:bg-slate-900/50 dark:backdrop-blur-md dark:border-l dark:border-slate-800 z-20 "top-0 right-0" ${
          isProgressMenuOpen || mediaQueries.xl ? "block" : "hidden"
        }`}
      >
        <section className="flex flex-col p-5 h-full">
          <div className="mb-6 pb-6 border-slate-200 dark:border-slate-800 border-b-2">
            <Logo />
          </div>
          <DarkMode />
          <TodosDone />
        </section>
      </div>
      {isProgressMenuOpen && !mediaQueries.xl && (
        <div
          className="top-0 left-0 z-10 fixed bg-slate-600/[.2] w-full h-full"
          onClick={closeProgressMenu}
        ></div>
      )}
    </>
  );
};

export default ProgressMenu;
