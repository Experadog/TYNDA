'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

interface ThemeContextType {
	theme?: Theme;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
	children,
	theme,
	...props
}: React.ComponentProps<typeof NextThemesProvider> & { theme?: Theme }) {
	return (
		<NextThemesProvider {...props}>
			<ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
		</NextThemesProvider>
	);
}

export function useThemeContext() {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeContext must be used within a ThemeProvider');
	}
	return context;
}
