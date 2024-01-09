import { useState, useEffect } from "react";

export default function Theme() {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme ? storedTheme : "light";
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const themeStyles = {
        light: {
            body: "#f3f3f3",
            text: "#000000",
            header: "#ffffff",
            footer: "#ffffff",
        },
        dark: {
            body: "#222736",
            text: "#ffffff",
            header: "#36394c",
            footer: "#36394c",
        },
    };

    return {
        theme,
        setTheme,
        toggleTheme,
        themeStyles,
    };
}
