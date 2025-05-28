import { useUsersContext } from '@/app/[locale]/dashboard/users/context/users-context-provider';
import CustomSelect from '@/components/ui/customSelect';
import type { EstablishmentSchema } from '@common';
import { Button, CustomFormField } from '@components';
import { useEstablisherAdditionUseCase } from '../../../../use-case/other/useEstablisherAdditionUseCase';

type Props = {
	schema: EstablishmentSchema;
	onChangeEstIdValidation: (should: boolean) => void;
};

const EstablisherBlock = ({ schema, onChangeEstIdValidation }: Props) => {
	const {
		pagination: {
			states: { data },
		},
	} = useUsersContext();

	const {
		actions: { activateCreation, deactivateCreation },
		states: { isEstablisherCreation },
	} = useEstablisherAdditionUseCase({ onChangeEstIdValidation });

	return (
		<div className="flex flex-col gap-4 font-roboto w-full">
			<div className="flex items-center justify-between">
				<p className="text-foreground_1 text-base font-medium">
					Выберите или создайте владельца предприятия
				</p>
				{isEstablisherCreation ? (
					<Button
						disableAnimation
						variant={'yellow'}
						className="shadow-none"
						onClick={deactivateCreation}
					>
						Выбрать
					</Button>
				) : (
					<Button
						disableAnimation
						variant={'yellow'}
						className="shadow-none"
						onClick={activateCreation}
					>
						Создать
					</Button>
				)}
			</div>
			<div className="w-full h-[1px] bg-light_gray flex flex-col gap-3" />

			{isEstablisherCreation ? (
				<div className="flex items-baseline gap-10">
					<CustomFormField
						control={schema.control}
						name="establisher.email"
						placeholder="Почта"
						type="text"
						InputClassName="bg-input_bg"
					/>

					<CustomFormField
						control={schema.control}
						name="establisher.password"
						placeholder="Пароль"
						type="password"
						InputClassName="bg-input_bg"
					/>
				</div>
			) : (
				<CustomSelect
					control={schema.control}
					name="establisher_id"
					data={data.map((user) => ({
						label: user.email,
						value: user?.id,
						avatar: user.avatar || '',
					}))}
					showAvatar
					placeholder="Выберите владельца предприятия"
					isAutoComplete
					className="py-3.5 text-base"
				/>
			)}
		</div>
	);
};

export default EstablisherBlock;
