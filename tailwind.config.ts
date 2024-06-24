/** @type {import('tailwindcss').Config} */

const inputText = ['13px', '15.23px'];

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      sm: ['11px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      'title': ['26px', '30px'],
      'input': inputText,
      'button-default-text': inputText,
      'button-accent-text': inputText,
      'button-destructive-text': inputText,
      'nav-bar': ['18px', '30px'],
    },
    fontFamily: {
      'roboto': ['Roboto', 'Helvetica', 'sans'],
    },
    extend: {
      colors: {
        border: "var(--border)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          'hover-light': "var(--primary-hover-light)",
          'hover-heavy': "var(--primary-hover-heavy)",
          foreground: "var(--primary-foreground)",
        },
        'button-default-text': "var(--primary-foreground)",
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        'button-destructive-text': "var(--destructive-foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        'button-accent-text': "var(--accent-foreground)",
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          solid: "var(--card-solid)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 5px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      maxHeight: {
        '128': '45rem',
      },
      width: {
        'nav-bar-button': '131.5px',
        '150': '37.5rem',
        'input': '27px',
        '13': '3.25rem',
      },
      height: {
        'nav-bar-button': '48px',
        'nav-bar': '90px',
        'input': '27px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}