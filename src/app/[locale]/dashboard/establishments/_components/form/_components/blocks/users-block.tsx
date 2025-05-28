import { useUsersContext } from '@/app/[locale]/dashboard/users/context/users-context-provider';
import CustomSelect from '@/components/ui/customSelect';
import type { EstablishmentSchema } from '@common';
import { useUserAdditionUseCase } from '../../../../use-case/other/useUserAdditionUseCase';

type Props = {
	schema: EstablishmentSchema;
};

const UsersBlock = ({ schema }: Props) => {
	const {
		states: { data },
	} = useUsersContext();

	const {
		states: { selectedUserID },
		actions: { onSelect },
	} = useUserAdditionUseCase();

	return (
		<div className="flex flex-col gap-4 font-roboto w-full">
			<p className="text-foreground_1 text-base font-medium">
				Выберите или создайте владельца предприятия
			</p>

			<CustomSelect
				control={schema.control}
				name="establisher"
				data={data.items.map((user) => ({
					label: user.email,
					value: user?.id,
					avatar: user.avatar,
				}))}
				showAvatar
				placeholder="Выберите сотрудника"
				isAutoComplete
				className="py-3.5 text-base"
			/>
		</div>
	);
};

export default UsersBlock;
