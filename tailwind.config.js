/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },

    plugins: [
        // eslint-disable-next-line no-undef
        require("tailwind-scrollbar"),
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-thin": {
                    scrollbarWidth: "thin",
                },
                ".scrollbar-webkit": {
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: "20px",
                    },
                },
            };
            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
};
