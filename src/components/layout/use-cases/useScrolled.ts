import { useEffect, useState } from 'react';

export function useScrolled(offset: number) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		if (window === undefined) return;

		const onScroll = () => {
			setIsScrolled(window.scrollY > offset);
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [offset]);

	return isScrolled;
}
