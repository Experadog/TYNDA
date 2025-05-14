'use client';

import { switchTheme } from '@common';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ToggleTheme = () => {
	const { forcedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <div className="w-5 h-5" />;

	const handleSetTheme = async () => {
		const theme = forcedTheme === 'dark' ? 'light' : 'dark';
		setTheme(theme);
		await switchTheme(theme);
	};

	return forcedTheme === 'dark' ? (
		<Sun className="w-5 h-5 cursor-pointer text-yellow" onClick={handleSetTheme} />
	) : (
		<Moon className="w-5 h-5 cursor-pointer text-darkBlue" onClick={handleSetTheme} />
	);
};

export default ToggleTheme;
