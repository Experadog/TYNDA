import { CSSProperties, FC, ReactNode } from 'react';
import './translate.css';

interface IProps {
    children: ReactNode;
    duration?: number;
    delay?: number;
    isVisible?: boolean;
    direction?: 'left' | 'right' | 'up' | 'down';
    distance?: number;
}

declare module 'react' {
    interface CSSProperties {
        '--distance'?: string;
    }
}

const Translate: FC<IProps> = ({
    children,
    duration = 1,
    delay = 0,
    isVisible = true,
    direction = 'left',
    distance = 20,
}) => {
    const style: CSSProperties = {
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        '--distance': `${distance}px`,
    };

    return (
        <div
            className={`translate ${
                isVisible ? 'translate-in' : 'translate-out'
            } direction-${direction}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default Translate;
