import { GoogleAnalytics, Layout } from '@components';

import { SpeedInsights } from '@vercel/speed-insights/next';
import HolyLoader from 'holy-loader';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Manrope, Roboto } from 'next/font/google';

import { type SupportedLanguages, supportedLanguages } from '@/i18n/routing';
import { COOKIES } from '@/lib';
import CollectedProviders from '@/providers/collected-providers';
import { getCookie } from '@common';
import '../globals.css';

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-roboto',
});

export const metadata: Metadata = {
	title: 'Tynda.kg',
	description:
		'Tynda.kg — уникальная онлайн-платформа для путешествий и отдыха в Кыргызской Республике. Здесь собраны туры, глэмпинги, юрты, рестораны, отели, развлечения и всё, что нужно туристу.',
	icons: '/page-icon.ico',
	robots: 'index, follow',
	keywords:
		'туризм, Кыргызстан, Кыргызская Республика, отдых, путешествия, юрта, глэмпинг, рестораны, кафе, отели, развлечения, экскурсии, горы, озёра, природа, эко-туризм, сервисы для туристов, Tynda, Tynda.kg, travel, Kyrgyzstan, Kyrgyz Republic yurt, glamping, mountain, lakes, eco tourism, restaurants, hotels, entertainment',
	metadataBase: new URL('https://tynda.kg'),
	authors: { name: 'Команда Tynda.kg' },
	publisher: 'Tynda.kg',
	openGraph: {
		title: 'Tynda.kg',
		description:
			'Tynda.kg — все для путешествий и отдыха в Кыргызской Республике: туры, глэмпинги, юрты, рестораны, отели, развлечения и многое другое.',

		images: ['/home/herobg.webp'],
		url: 'https://tynda.kg',
		type: 'website',
		locale: 'ru_RU',
		siteName: 'Tynda.kg',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Tynda.kg',
		description:
			'Tynda.kg — универсальная платформа для туризма и отдыха в Кыргызской Республике: туры, заведения, сервисы и развлечения для каждого.',
		images: ['/home/herobg.webp'],
		creator: '@TyndaKG',
	},
	alternates: {
		canonical: 'https://tynda.kg',
		languages: {
			ru: 'https://tynda.kg/ru',
			kg: 'https://tynda.kg/kg',
			en: 'https://tynda.kg/en',
		},
	},
	verification: {
		google: '9lHV1DEx2SzxWVdBRj49hHbvp9EM3xEbfp7mPRpm4nQ',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1.0,
	maximumScale: 1.0,
	themeColor: '#f4a900',
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { locale: SupportedLanguages };
}>) {
	const { locale } = await params;

	const settings = await getCookie(COOKIES.USER_SETTINGS, true);

	return (
		<html
			lang={locale || supportedLanguages[0]}
			suppressHydrationWarning
			style={{ maxWidth: settings ? '100vw' : 'auto' }}
		>
			<GoogleAnalytics />

			<head>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebSite',
							name: 'Tynda.kg',
							url: 'https://tynda.kg',
							potentialAction: {
								'@type': 'SearchAction',
								target: 'https://tynda.kg/search?q={search_term_string}',
								'query-input': 'required name=search_term_string',
							},
						}),
					}}
				/>

				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: 'Tynda.kg',
							url: 'https://tynda.kg',
							logo: 'https://tynda.kg/page-icon.png',
							sameAs: [
								'https://www.instagram.com/soyuz.kg/',
								'https://vk.com/soyuzkg',
								'https://t.me/SOYUZKG',
							],
						}),
					}}
				/>

				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'BreadcrumbList',
							itemListElement: [
								{
									'@type': 'ListItem',
									position: 1,
									name: 'Главная',
									item: 'https://tynda.kg',
								},

								{
									'@type': 'ListItem',
									position: 2,
									name: 'Карта',
									item: 'https://tynda.kg/ru/benefits-map',
								},
								{
									'@type': 'ListItem',
									position: 3,
									name: 'О нас',
									item: 'https://tynda.kg/ru/about',
								},

								{
									'@type': 'ListItem',
									position: 4,
									name: 'Контакты',
									item: 'https://tynda.kg/ru/contacts',
								},

								{
									'@type': 'ListItem',
									position: 5,
									name: 'Услуги',
									item: 'https://tynda.kg/ru/tariffs',
								},
							],
						}),
					}}
				/>
			</head>

			<body className={`${manrope.className} ${roboto.variable} antialiased min-w-96`}>
				<HolyLoader
					color="var(--yellow)"
					height={3}
					showSpinner={false}
					zIndex={999999999}
				/>

				<NextIntlClientProvider>
					<CollectedProviders>
						<Layout>{children}</Layout>
						<SpeedInsights />
					</CollectedProviders>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
