import { useViewModel } from '@/i18n/getTranslate';
import { UserRole } from '@business-entities';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@components';
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
		<Dialog open={isConfirmModal} onOpenChange={closeConfirmModal}>
			<DialogContent className="bg-background_6 p-10 border-none xs:max-w-[90%]">
				<DialogHeader>
					<DialogTitle className="text-foreground_1 text-center mb-6 text-xl">
						{isActivating ? Auth.ConfirmEmail.modal_title : title}
					</DialogTitle>
					<DialogDescription className="text-gray text-center">
						{isActivating
							? Auth.ConfirmEmail.confirm_code_title
							: Auth.ConfirmEmail.email_title}
					</DialogDescription>
				</DialogHeader>
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
			</DialogContent>
		</Dialog>
	);
};

export default RegisterDialog;
