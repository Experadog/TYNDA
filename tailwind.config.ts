import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: 'var(--font-roboto)',
			},

			fontSize: {
				sm: 'var(--font-sm)',
				base: 'var(--font-base)',
				lg: 'var(--font-lg)',
			},
			borderRadius: {
				DEFAULT: 'var(--radius-base)',
				md: 'var(--radius-md)',
				lg: 'var(--radius-lg)',
				xl: 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
			},

			colors: {
				//dynamic
				background_1: 'var(--background-1)',
				background_2: 'var(--background-2)',
				background_3: 'var(--background-3)',
				background_4: 'var(--background-4)',
				background_5: 'var(--background-5)',
				background_6: 'var(--background-6)',

				foreground_1: 'var(--foreground-1)',
				foreground_2: 'var(--foreground-2)',
				foreground_3: 'var(--foreground-3)',

				gray: 'var(--gray)',
				shade_gray: 'var(--shade-gray)',
				light_gray: 'var(--light-gray)',
				placeholder: 'var(--placeholder)',
				input_bg: 'var(--input-bg)',

				gradient: 'var(--gradient)',

				orange: 'var(--orange)',
				yellow: 'var(--yellow)',
				error: 'var(--error)',
				success: 'var(--success)',

				chat_my: 'var(--chat-my)',
				chat_incoming: 'var(--chat-incoming)',
			},

			screens: {
				exs: { max: '375px' },
				xs: { max: '480px' },
				sm: { max: '640px' },
				md: { max: '768px' },
				lg: { max: '1024px' },
				xl: { max: '1280px' },
				xxl: { max: '1440px' },
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
