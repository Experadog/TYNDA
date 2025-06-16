import { useViewModel } from '@/i18n/getTranslate';
import { UserRole } from '@business-entities';
import { Button, DialogFooter, DialogWrapper } from '@components';
import { useRegisterUseCase } from '../use-case/useRegisterUseCase';
import ActivationCodeInput from './register-activation-inputs';

const RegisterDialog = () => {
	const { states, actions } = useRegisterUseCase();
	const { clientForm, partnerForm, role, isConfirmModal, isActivating, code, inputsRef } = states;
	const { closeConfirmModal, onConfirm, handleChange, handleKeyDown, handlePaste } = actions;

	const { Auth, Buttons } = useViewModel(['Auth', 'Buttons']);

	const title =
		role === UserRole.CLIENT ? clientForm.getValues('email') : partnerForm.getValues('email');

	return (
		<DialogWrapper
			isOpen={isConfirmModal}
			onClose={closeConfirmModal}
			action="default"
			direction="vertical"
			title={isActivating ? Auth.ConfirmEmail.modal_title : title}
			description={
				isActivating ? Auth.ConfirmEmail.confirm_code_title : Auth.ConfirmEmail.email_title
			}
		>
			{isActivating ? (
				<ActivationCodeInput
					code={code}
					handleChange={handleChange}
					handleKeyDown={handleKeyDown}
					handlePaste={handlePaste}
					inputsRef={inputsRef}
				/>
			) : null}
			<DialogFooter className="mt-3">
				<div className="flex flex-col w-full gap-5">
					<Button
						onClick={onConfirm}
						disabled={!code.every(Boolean) && isActivating}
						type="button"
						variant={'yellow'}
						className="text-white text-sm font-semibold rounded-2xl p-6 disabled:opacity-70"
					>
						{Buttons.confirm}
					</Button>

					<Button
						onClick={closeConfirmModal}
						type="button"
						variant={'default'}
						className="text-foreground_1 bg-light_gray text-sm font-semibold rounded-2xl p-6 shadow-none"
					>
						{Buttons.back}
					</Button>
				</div>
			</DialogFooter>
		</DialogWrapper>
	);
};

export default RegisterDialog;
