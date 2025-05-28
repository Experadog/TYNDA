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
	const { clientForm, partnerForm, role, isConfirmModal, isActivating } = states;
	const { closeConfirmModal, onConfirm } = actions;

	const title =
		role === UserRole.CLIENT ? clientForm.getValues('email') : partnerForm.getValues('email');

	return (
		<Dialog open={isConfirmModal} onOpenChange={closeConfirmModal}>
			<DialogContent className="bg-background_1 p-10 border-none">
				<DialogHeader>
					<DialogTitle className="text-foreground_1 text-center mb-6 text-xl ">
						{isActivating ? 'Подтверждение кода' : title}
					</DialogTitle>
					<DialogDescription className="text-gray text-center">
						{isActivating
							? 'Проверьте, правильно ли вы ввели код активации почты'
							: 'Проверьте, правильно ли указана ваша электронная почта - мы отправим на него код подтверждения'}
					</DialogDescription>
				</DialogHeader>
				{isActivating && <ActivationCodeInput />}
				<DialogFooter className="mt-5">
					<div className="flex flex-col w-full gap-5">
						<Button
							onClick={onConfirm}
							type="button"
							variant={'yellow'}
							className="text-white text-sm font-semibold rounded-2xl p-6"
						>
							Подтвердить
						</Button>

						<Button
							onClick={closeConfirmModal}
							type="button"
							variant={'default'}
							className="text-foreground_1 bg-light_gray text-sm font-semibold rounded-2xl p-6 shadow-none"
						>
							Назад
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default RegisterDialog;
