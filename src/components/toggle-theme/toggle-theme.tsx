'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className='w-10 h-10' />;

    const handleSetTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return resolvedTheme === 'dark' ? (
        <Sun
            className='w-5 h-5 cursor-pointer text-yellow'
            onClick={handleSetTheme}
        />
    ) : (
        <Moon
            className='w-5 h-5 cursor-pointer text-darkBlue'
            onClick={handleSetTheme}
        />
    );
};

export default ThemeToggle;
