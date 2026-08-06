/**
 * tailwind.config.ts — Signal Design System tokens
 *
 * NOTE (Tailwind v4): This project uses Tailwind v4 which is configured
 * CSS-first via `@theme` in globals.css. This file mirrors those tokens
 * for IDE autocomplete / documentation. The @theme block in globals.css
 * is the authoritative source.
 *
 * Token names match AGENTS.md exactly:
 *   void, navy, glass, cyan, violet, fog, mist
 */

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /** Scene backgrounds */
        void:   '#05070C',
        navy:   '#0B1220',
        /** Primary accent — terminal teal */
        cyan:   { DEFAULT: '#56E8D0', light: '#6EF0DA' },
        /** Secondary accent — electric violet */
        violet: { DEFAULT: '#8B7CF6' },
        /** Text */
        fog:    '#EDEFF3',
        mist:   '#8B93A3',
        /** Glass surface */
        glass: {
          DEFAULT: 'rgba(255,255,255,0.05)',
          border:  'rgba(255,255,255,0.12)',
          strong:  'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)',         'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)',     'monospace'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        glass: '1.25rem',   /* 20px — matches hero-preview */
      },
      backdropBlur: {
        glass: '22px',
      },
    },
  },
};

module.exports = config;
