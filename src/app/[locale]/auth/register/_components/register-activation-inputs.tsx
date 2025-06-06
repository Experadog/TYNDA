import type { RefObject } from 'react';

type Props = {
	handleChange: (index: number, value: string) => void;
	handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
	handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
	code: string[];
	inputsRef: RefObject<(HTMLInputElement | null)[]>;
};

const ActivationCodeInput = ({
	handleChange,
	handleKeyDown,
	handlePaste,
	code,
	inputsRef,
}: Props) => {
	return (
		<div className="flex items-center gap-2">
			{code.map((num, index) => (
				<input
					key={`${index}-${num}`}
					ref={(el) => {
						inputsRef.current[index] = el;
					}}
					type="number"
					value={num.length > 1 ? num[0] : num}
					onChange={(e) => handleChange(index, e.target.value)}
					onKeyDown={(e) => handleKeyDown(index, e)}
					onPaste={handlePaste}
					maxLength={1}
					max={1}
					className="w-full h-16 bg-input_bg border-2 border-shade_gray outline-none rounded-xl text-center text-foreground_1 focus:border-yellow font-semibold text-xl font-mono xs:h-11"
				/>
			))}
		</div>
	);
};

export default ActivationCodeInput;
