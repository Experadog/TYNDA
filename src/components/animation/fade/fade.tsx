import { FC, ReactNode } from 'react';
import './fade.css';

interface IProps {
    children: ReactNode;
    duration?: number;
    delay?: number;
    isVisible?: boolean;
}

const Fade: FC<IProps> = ({ children, duration = 1, delay = 0, isVisible = true }) => {
    return (
        <div
            className={`fade ${isVisible ? 'fade-in' : 'fade-out'}`}
            style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
};

export default Fade;
