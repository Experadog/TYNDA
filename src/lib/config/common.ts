export const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY || '';

export const TIMES = [
	'00:00',
	'00:30',
	'01:00',
	'01:30',
	'02:00',
	'02:30',
	'03:00',
	'03:30',
	'04:00',
	'04:30',
	'05:00',
	'05:30',
	'06:00',
	'06:30',
	'07:00',
	'07:30',
	'08:00',
	'08:30',
	'09:00',
	'09:30',
	'10:00',
	'10:30',
	'11:00',
	'11:30',
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
	'17:00',
	'17:30',
	'18:00',
	'18:30',
	'19:00',
	'19:30',
	'20:00',
	'20:30',
	'21:00',
	'21:30',
	'22:00',
	'22:30',
	'23:00',
	'23:30',
];

export const SOCIAL_MEDIAS = {
	telegram: {
		title: 'Telegram',
		icon: '/sm/telegram.svg',
	},
	whatsApp: {
		title: 'WhatsApp',
		icon: '/sm/whatsapp.svg',
	},

	instagram: {
		title: 'Instagram',
		icon: '/sm/instagram.svg',
	},

	facebook: {
		title: 'Facebook',
		icon: '/sm/facebook.svg',
	},
	twitter: {
		title: 'Twitter',
		icon: '/sm/twitter.svg',
	},
	tiktok: {
		title: 'TikTok',
		icon: '/sm/tiktok.svg',
	},
	youtube: {
		title: 'YouTube',
		icon: '/sm/youtube.svg',
	},
	vk: {
		title: 'VK',
		icon: '/sm/vk-white.svg',
	},
	linkedin: {
		title: 'LinkedIn',
		icon: '/sm/linkedin.svg',
	},

	phone: {
		title: 'Phone',
		icon: '/sm/phone.svg',
	},
};

export const ROLE_DEFAULT_IDS = {
	EST_WORKER: '22222222-2222-2222-2222-222222222223',
	CLIENT: '22222222-2222-2222-2222-222222222222',
	EST: '22222222-2222-2222-2222-222222222221',
};

export const REVALIDATE = {
	FIVE_MIN: 5 * 60 * 1000,
	TEN_MIN: 10 * 60 * 1000,
	ONE_MIN: 1 * 60 * 1000,
};
