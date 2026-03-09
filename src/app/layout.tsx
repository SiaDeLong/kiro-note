"use client";

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ProgressMenuProvider } from "~/context/ProgressMenuContext";
import { ModalProvider } from "~/context/ModalContext";
import { TodoProvider } from "~/context/TodoContext";
import { ThemeProvider } from "~/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body className="bg-slate-200 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen text-slate-600 dark:text-slate-300 text-xs sm:text-sm xl:text-base transition-colors duration-300">
        <div>
          <ThemeProvider>
            <TodoProvider>
              <ModalProvider>
                <ProgressMenuProvider>{children}</ProgressMenuProvider>
              </ModalProvider>
            </TodoProvider>
          </ThemeProvider>
        </div>
        <footer className="py-6 font-medium dark:text-slate-400 text-center">Creation • Eric Sia</footer>
      </body>
    </html>
  );
}


