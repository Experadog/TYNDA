import { type FieldValues, type Path, type UseFormReturn, get } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';

export const renderIconByValidationStatus = <T extends FieldValues>(
	schema: UseFormReturn<T>,
	keys: Path<T>[],
) => {
	const { errors } = schema.formState;
	const hasError = keys.some((key) => !!get(errors, key));
	return hasError ? ErrorIcon : SuccessIcon;
};

const SuccessIcon = <FaCheck color="var(--success)" className="text-xl" />;
const ErrorIcon = <RxCross2 color="var(--error)" className="text-xl" />;
