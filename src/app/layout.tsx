"use client";

import "~/styles/globals.css";
import { useEffect } from "react";

import { GeistSans } from "geist/font/sans";
import { ProgressMenuProvider } from "~/context/ProgressMenuContext";
import { ModalProvider } from "~/context/ModalContext";
import { TodoProvider } from "~/context/TodoContext";
import { ThemeProvider } from "~/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    // Update meta tags dynamically
    document.title = "Kiro Note 記録ノート - Modern Todo & Task Management App";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Kiro Note is a beautiful, modern todo and task management application with drag-and-drop, dark mode, and smart sorting. Organize your tasks efficiently with an intuitive Japanese-inspired design.');
    }
  }, []);

  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Kiro Note is a beautiful, modern todo and task management application with drag-and-drop, dark mode, and smart sorting. Organize your tasks efficiently with an intuitive Japanese-inspired design." />
        <meta name="keywords" content="todo app, task manager, productivity, note taking, 記録ノート, kiro note, drag and drop, dark mode, task organizer, todo list, task list" />
        <meta name="author" content="Eric Sia" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kiro Note 記録ノート - Modern Todo & Task Management" />
        <meta property="og:description" content="Beautiful, modern todo app with drag-and-drop, dark mode, and smart sorting. Organize your tasks efficiently." />
        <meta property="og:site_name" content="Kiro Note" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiro Note 記録ノート - Modern Todo & Task Management" />
        <meta name="twitter:description" content="Beautiful, modern todo app with drag-and-drop, dark mode, and smart sorting." />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#7c3aed" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#8b5cf6" media="(prefers-color-scheme: light)" />
        
        {/* Apple */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kiro Note" />
        
        {/* Favicon - theme aware */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        
        <title>Kiro Note 記録ノート - Modern Todo & Task Management App</title>
      </head>
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


