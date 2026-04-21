import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0d1117',
          secondary: '#161b22',
          tertiary: '#21262d',
        },
        accent: '#58a6ff',
        muted: '#8b949e',
        border: '#30363d',
        green: '#3fb950',
        orange: '#f0883e',
        red: '#f85149',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        loadblink: {
          '0%, 80%, 100%': { opacity: '0.2' },
          '40%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        loadblink: 'loadblink 1.2s infinite',
      },
    },
  },
  plugins: [],
}
export default config
