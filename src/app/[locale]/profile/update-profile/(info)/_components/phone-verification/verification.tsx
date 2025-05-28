'use client';

import {
    Button,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components';
import { FC, useRef } from 'react';
import { useUpdateProfileUseCase } from '../../../use-case/useUpdateProfileUseCase';

const Verification: FC = () => {
    const {
        actions: { phone },
        states: {
            phone: {
                preVerification: { isExecuted, requestId },
            },
        },
    } = useUpdateProfileUseCase();

    const {
        code: codeArray,
        setCode,
        error,
        isLoading,
        start,
        close,
    } = phone.verificationCode;

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...codeArray];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !codeArray[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const code = codeArray.join('');
        if (!isExecuted || !requestId) {
            // Вывести сообщение или заново инициировать preVerification
            return;
        }
        await start(code, requestId);
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle className='text-foreground_1 text-center mb-6 text-xl '>
                    Подтверждение номера телефона
                </DialogTitle>
                <DialogDescription className='text-gray text-center numeric mb-4'>
                    Пожалуйста, введите код, который был отправлен в Telegram
                </DialogDescription>

                <div className='flex items-center gap-2 justify-center'>
                    {codeArray.map((num, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputsRef.current[index] = el;
                            }}
                            type="text"
                            value={num}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength={1}
                            className="w-10 h-12 bg-input_bg border-2 border-shade_gray outline-none rounded-xl text-center text-foreground_1 focus:border-yellow font-semibold text-xl font-mono"
                        />
                    ))}
                </div>

                {error && (
                    <div className='text-red-500 text-sm text-center mt-4'>{error}</div>
                )}
            </DialogHeader>

            <DialogFooter className='mt-5'>
                <div className='flex flex-col w-full gap-5'>
                    <Button
                        type='button'
                        variant='yellow'
                        className='text-white text-sm font-semibold rounded-2xl p-6'
                        onClick={handleSubmit}
                        disabled={isLoading || codeArray.some((c: any) => !c)}
                    >
                        {isLoading ? 'Проверка...' : 'Подтвердить'}
                    </Button>

                    <Button
                        type='button'
                        variant='default'
                        className='text-foreground_1 bg-light_gray text-sm font-semibold rounded-2xl p-6 shadow-none'
                        onClick={close}
                    >
                        Назад
                    </Button>
                </div>
            </DialogFooter>
        </>
    );
};

export default Verification;
