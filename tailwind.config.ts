import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                //dynamic
                background_1: 'var(--background-1)',
                background_2: 'var(--background-2)',
                background_3: 'var(--background-3)',
                background_4: 'var(--background-4)',

                foreground_1: 'var(--foreground-1)',
                foreground_2: 'var(--foreground-2)',
                foreground_3: 'var(--foreground-3)',

                gray: 'var(--gray)',
                shade_gray: 'var(--shade-gray)',
                light_gray: 'var(--light-gray)',
                placeholder: 'var(--placeholder)',
                input_bg: 'var(--input-bg)',

                //static
                darkBlue: 'var(--darkBlue)',
                yellow: 'var(--yellow)',
                error: 'var(--error)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;
