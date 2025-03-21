import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	colors: {
  		main: 'var(--main)',
  		overlay: 'var(--overlay)',
  		bg: 'var(--bg)',
  		bw: 'var(--bw)',
  		blank: 'var(--blank)',
  		text: 'var(--text)',
  		mtext: 'var(--mtext)',
  		border: 'var(--border)',
  		ring: 'var(--ring)',
  		ringOffset: 'var(--ring-offset)',
  		secondaryBlack: '#212121'
  	},
  	borderRadius: {
  		base: '0px'
  	},
  	boxShadow: {
  		shadow: 'var(--shadow)'
  	},
  	translate: {
  		boxShadowX: '6px',
  		boxShadowY: '4px',
  		reverseBoxShadowX: '-6px',
  		reverseBoxShadowY: '-4px'
  	},
  	fontWeight: {
  		base: '700',
  		heading: '700'
  	},
  	fontFamily: {
  		sans: [
  			'var(--font-geist-sans)',
  			'sans-serif'
  		],
  		mono: [
  			'var(--font-geist-mono)',
  			'monospace'
  		],
  		orbitron: [
  			'var(--font-orbitron)',
  			'sans-serif'
  		]
  	},
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
