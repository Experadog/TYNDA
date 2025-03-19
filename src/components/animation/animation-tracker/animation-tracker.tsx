'use client';

import { FC, useEffect, useRef } from 'react';

const AnimationTracker: FC = () => {
    const frameCount = useRef(0);
    const lastCheck = useRef(performance.now());
    const fpsRef = useRef(60);

    useEffect(() => {
        let rafId: number;

        const checkFPS = () => {
            frameCount.current++;

            const now = performance.now();
            if (now - lastCheck.current >= 5000) {
                const fps = (frameCount.current / 5) | 0;
                fpsRef.current = fps;
                frameCount.current = 0;
                lastCheck.current = now;

                if (fps < 50) {
                    document.body.classList.add('reduce-motion');
                } else {
                    document.body.classList.remove('reduce-motion');
                }
            }

            rafId = requestAnimationFrame(checkFPS);
        };

        rafId = requestAnimationFrame(checkFPS);

        return () => {
            cancelAnimationFrame(rafId);
            document.body.classList.remove('reduce-motion');
        };
    }, []);

    return null;
};

export default AnimationTracker;
