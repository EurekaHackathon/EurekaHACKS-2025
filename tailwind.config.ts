import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Manrope", "system-ui", "sans-serif"],
        },
        extend: {
            screens: {
                "landscape": {
                    "raw": "(orientation: landscape)"
                },
                "portrait": {
                    "raw": "(orientation: portrait)"
                }
            },
            colors: {
                "primary": {
                    "50": "#faf6fe",
                    "100": "#f3e9fe",
                    "200": "#e9d8fc",
                    "300": "#d8b9f9",
                    "400": "#c08bf5",
                    "500": "#ac67ee",
                    "600": "#923edf",
                    "700": "#7d2dc3",
                    "800": "#6a29a0",
                    "900": "#572380",
                    "950": "#3a0d5e",
                },
                "secondary": {
                    "50": "#f5f4fe",
                    "100": "#eceafd",
                    "200": "#dbd9fb",
                    "300": "#c0baf8",
                    "400": "#a093f2",
                    "500": "#846cec",
                    "600": "#6d46e1",
                    "700": "#5e34cd",
                    "800": "#4e2bac",
                    "900": "#42258d",
                    "950": "#27165f",
                },
                "accent": {
                    "50": "#fdf8ed",
                    "100": "#f8ebcd",
                    "200": "#efcd83",
                    "300": "#eaba5f",
                    "400": "#e5a13a",
                    "500": "#dd8323",
                    "600": "#c4621b",
                    "700": "#a3451a",
                    "800": "#85371b",
                    "900": "#6d2e1a",
                    "950": "#3e160a",
                },
                "error": {
                    "50": "#fdf2f7",
                    "100": "#fce7f2",
                    "200": "#fccee6",
                    "300": "#fba6d0",
                    "400": "#f76fb0",
                    "500": "#f04692",
                    "600": "#df236e",
                    "700": "#c21454",
                    "800": "#a01445",
                    "900": "#86153e",
                    "950": "#520520",
                },
            },
        }
    }
};

export default config;
