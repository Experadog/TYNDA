import { Building2, MessageCircle, Percent, Settings, ShieldCheck, Users } from 'lucide-react';

export enum PAGES {
	HOME = '/',
	BENEFITS_MAP = '/benefits-map',
	ABOUT = '/about',
	MAP = '/map',
	SERVICE = '/tariffs',
	CONTACTS = '/contacts',
	CALLBACK = '/callback',
	DASHBOARD = '/dashboard',
	SERVICES = '/services',
	ENTERPRISES_ALL = '/all-enterprises',

	// nested auth
	LOGIN = '/auth/login',
	REGISTER = '/auth/register',

	// nested profile
	PROFILE = '/profile',
	UPDATE_PROFILE = '/profile/update-profile',
	PROFILE_CREDENTIALS = '/profile/update-profile/credentials',
	PROFILE_TARIFF = '/profile/update-profile/tariff',
	PROFILE_CHAT = '/profile/update-profile/chat',

	//nested dashboard
	DASHBOARD_CHAT = '/dashboard/chat',
	DISCOUNTS = '/dashboard/discounts',
	SETTINGS = '/dashboard/settings',

	ESTABLISHMENT = '/dashboard/establishments',
	ESTABLISHMENT_CREATION = '/dashboard/establishments/creation',

	USERS = '/dashboard/users',
	ROLES = '/dashboard/roles',

	STAFF = '/staff',
	ESTABLISHMENT_CHAT = '/establishment-chat',

	//Enterprises
}

export const NAV_LINKS = [
	PAGES.HOME,
	PAGES.BENEFITS_MAP,
	PAGES.ABOUT,
	PAGES.CONTACTS,
	PAGES.SERVICE,
];
export const PROFILE_LINKS = [
	PAGES.UPDATE_PROFILE,
	PAGES.PROFILE_CREDENTIALS,
	PAGES.PROFILE_TARIFF,
	PAGES.PROFILE_CHAT,
];

export const DASHBOARD_LINKS = {
	super_user: [
		{
			key: 'ESTABLISHMENT',
			link: PAGES.ESTABLISHMENT,
			icon: Building2,
		},
		{
			key: 'USERS',
			link: PAGES.USERS,
			icon: Users,
		},
		{
			key: 'ROLES',
			link: PAGES.ROLES,
			icon: ShieldCheck,
		},
		{
			key: 'DASHBOARD_CHAT',
			link: PAGES.DASHBOARD_CHAT,
			icon: MessageCircle,
		},
		{
			key: 'DISCOUNTS',
			link: PAGES.DISCOUNTS,
			icon: Percent,
		},
		{
			key: 'SETTINGS',
			link: PAGES.SETTINGS,
			icon: Settings,
		},
	],

	establisher: [
		{ key: 'ESTABLISHMENT', link: PAGES.ESTABLISHMENT, icon: Building2 },
		{ key: 'DISCOUNTS', link: PAGES.DISCOUNTS, icon: Percent },
		{ key: 'SETTINGS', link: PAGES.SETTINGS, icon: Settings },
	],

	establishment_worker: [
		{ key: 'ESTABLISHMENT', link: PAGES.ESTABLISHMENT, icon: Building2 },
		{ key: 'SETTINGS', link: PAGES.SETTINGS, icon: Settings },
	],
} as const;
