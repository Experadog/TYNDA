import { GoogleAnalytics, Layout } from '@components';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Raleway, Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { type SupportedLanguages, supportedLanguages } from '@/i18n/routing';
import { PAGES } from '@/lib';
import CollectedProviders from '@/providers/collected-providers';
import { headers } from 'next/headers';
import '../globals.css';

const raleway = Raleway({
	variable: '--font-raleway',
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-roboto',
});

export const metadata: Metadata = {
	title: 'Tynda.kg',
	description:
		'Tynda.kg — это единая платформа для туризма и отдыха в Кыргызстане, где собраны все категории, связанные с путешествиями и отдыхом',
	icons: '/page-icon.ico',
	robots: 'index, follow',
	keywords:
		'юридические вопросы, малый бизнес, документы, туризм, средний бизнес, Кыргызстан, образовательные программы, миграционные вопросы, реклама',
	openGraph: {
		title: 'Tynda.kg',
		description:
			'Tynda.kg — это единая платформа для туризма и отдыха в Кыргызстане, где собраны все категории, связанные с путешествиями и отдыхом',
		images: ['/page-icon.ico'],
		url: 'https://tynda.kg',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Tynda.kg',
		description:
			'Tynda.kg — это единая платформа для туризма и отдыха в Кыргызстане, где собраны все категории, связанные с путешествиями и отдыхом',
		images: ['/home/hero.webp'],
	},
	metadataBase: new URL('https://tynda.kg'),
	alternates: {
		canonical: 'https://tynda.kg',
		languages: {
			ru: 'https://tynda.kg/ru',
			ky: 'https://tynda.kg/kg',
			en: 'https://tynda.kg/en',
		},
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1.0,
	maximumScale: 1.0,
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { locale: SupportedLanguages };
}>) {
	const { locale } = await params;

	const headersList = await headers();
	const path =
		headersList.get('x-invoke-path') ||
		headersList.get('referer') ||
		headersList.get('next-url') ||
		'';

	const isDashboard = path.includes(PAGES.DASHBOARD);

	return (
		<html
			lang={locale || supportedLanguages[0]}
			suppressHydrationWarning
			style={{ maxWidth: isDashboard ? '100vw' : 'auto' }}
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
			</head>

			<body className={`${raleway.variable} ${roboto.variable} antialiased min-w-96`}>
				<NextTopLoader
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
