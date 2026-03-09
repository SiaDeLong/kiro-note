

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react'

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const defaultContextValue: ThemeContextType = {
    theme: 'dark',
    toggleTheme: () => {
        // Implementation pending
    }
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const initialTheme = storedTheme || 'dark';
        setTheme(initialTheme);
        document.documentElement.classList.add(initialTheme);
        if (!storedTheme) {
            localStorage.setItem('theme', 'dark');
        }
    }, []);

    useEffect(() => {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);