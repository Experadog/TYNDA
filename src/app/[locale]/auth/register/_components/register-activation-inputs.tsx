import { useRegisterUseCase } from '../use-case/useRegisterUseCase';

const ActivationCodeInput = () => {
    const { actions, states } = useRegisterUseCase();
    const { handleChange, handleKeyDown } = actions;
    const { inputsRef, code } = states;

    return (
        <div className='flex items-center gap-2'>
            {code.map((num, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputsRef.current[index] = el;
                    }}
                    type='text'
                    value={num}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    className='w-full h-16 bg-input_bg border-2 border-shade_gray outline-none rounded-xl text-center text-foreground_1 focus:border-yellow font-semibold text-xl font-mono'
                />
            ))}
        </div>
    );
};

export default ActivationCodeInput;
