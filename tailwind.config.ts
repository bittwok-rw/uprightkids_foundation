/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		transform: {
			'preserve-3d': 'preserve-3d',
		  },
		  perspective: {
			DEFAULT: '1000px',
		  },
		  backfaceVisibility: {
			hidden: 'hidden',
		  },
		colors: {
			onyx: "#0E0E2C",
			evergreen: "#ED4B9E",
			slate: "#4A4A68",
			"light-slate": "#8C8CA1",
			dorian: "#ECF1F4",
			cloud: "#FAFCFE",
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			primary: {
			  DEFAULT: "#033AB9",
			  hover: "#FDD403",
			  foreground: "#fff",
			  50: "#E5EBF8",
			  100: "#CCD7F1",
			  200: "#B3C3EA",
			  300: "#9AB0E3",
			  400: "#819CDC",
			  500: "#6788D5",
			  600: "#4E75CE",
			  700: "#3561C7",
			  800: "#1C4DC0",
			  900: "#033AB9",
			},
			card: {
			  DEFAULT: "hsl(var(--card))",
			  foreground: "hsl(var(--card-foreground))",
			},
			popover: {
			  DEFAULT: "hsl(var(--popover))",
			  foreground: "hsl(var(--popover-foreground))",
			},
			secondary: {
			  DEFAULT: "hsl(var(--secondary))",
			  foreground: "hsl(var(--secondary-foreground))",
			  50: "#FEFAE5",
			  100: "#FEF6CC",
			  200: "#FEF2B3",
			  300: "#FEED9A",
			  400: "#FEE981",
			  500: "#FDE567",
			  600: "#FDE04E",
			  700: "#FDDC35",
			  800: "#FDD81C",
			  900: "#FDD403",
			},
			tertiary: {
			  50: "#E6E6E6",
			  100: "#CDCECE",
			  200: "#B5B5B5",
			  300: "#9C9D9D",
			  400: "#848484",
			  500: "#6B6C6C",
			  600: "#525353",
			  700: "#3A3A3A",
			  800: "#212222",
			  900: "#090A0A",
			},
			muted: {
			  DEFAULT: "hsl(var(--muted))",
			  foreground: "hsl(var(--muted-foreground))",
			},
			accent: "#FDD403",
			destructive: {
			  DEFAULT: "hsl(var(--destructive))",
			  foreground: "hsl(var(--destructive-foreground))",
			},
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			chart: {
			  "1": "hsl(var(--chart-1))",
			  "2": "hsl(var(--chart-2))",
			  "3": "hsl(var(--chart-3))",
			  "4": "hsl(var(--chart-4))",
			  "5": "hsl(var(--chart-5))",
			},
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
