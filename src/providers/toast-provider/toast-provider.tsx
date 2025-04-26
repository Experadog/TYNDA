'use client';

import { Toaster } from 'react-hot-toast';

export const ToastClientProvider = ({ theme }: { theme: string }) => {
    return (
        <Toaster
            position='bottom-right'
            toastOptions={{
                style: {
                    background: theme === 'dark' ? '#333' : '#f5f5f5',
                    color: theme === 'dark' ? '#f5f5f5' : '#333',
                    border: '1px solid',
                    borderColor: '#f5f5f5',
                    fontWeight: 600,
                    boxShadow:
                        theme === 'dark'
                            ? '0px 0px 5px rgba(0,0,0,0.5), 0px 0px 5px rgba(255,255,255,0.5)'
                            : '0px 0px 5px rgba(0,0,0,0.3), 0px 0px 5px rgba(255,255,255,0.3)',
                },
            }}
        />
    );
};
