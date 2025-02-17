import { FC, useEffect, useState } from 'react';

interface IProps {}

const FpsShow: FC<IProps> = ({}) => {
    const [fps, setFps] = useState(0);
    let lastTime = 0;
    let frameCount = 0;

    const monitorFPS = () => {
        const now = performance.now();
        frameCount++;

        if (now - lastTime >= 1000) {
            setFps(frameCount);
            frameCount = 0;
            lastTime = now;
        }

        requestAnimationFrame(monitorFPS);
    };

    useEffect(() => {
        monitorFPS();
    }, []);

    return (
        <div className='bg-yellow text-black font-extrabold text-md rounded-2xl p-3 fixed bottom-5 right-5'>
            FPS: {fps}
        </div>
    );
};

export default FpsShow;
