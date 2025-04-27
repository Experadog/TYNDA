import type { FC, InputHTMLAttributes } from 'react';

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
	// тут свои кастомные пропсы, если нужны
	isTextArea?: boolean;
};

const CustomInput: FC<CustomInputProps> = (props) => {
	return props.isTextArea ? (
		<textarea
			placeholder={props.placeholder}
			name={props.name}
			value={props.value}
			defaultValue={props.defaultValue}
			className={`outline-none border border-light_gray px-4 py-3 rounded-xl bg-input_bg numeric ${props.className || ''}`}
		/>
	) : (
		<input
			{...props}
			className={`outline-none border border-light_gray px-4 py-3 rounded-xl bg-input_bg numeric ${props.className || ''}`}
		/>
	);
};

export default CustomInput;
