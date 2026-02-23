/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#161C2E",
                secondary: "#007392",
                thirdary: "#1d2334",
            },
        },
    },
    plugins: [],
};
