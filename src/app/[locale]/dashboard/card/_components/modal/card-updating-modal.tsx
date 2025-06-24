'use client';

import CustomCalendar from '@/components/ui/customCalendar';
import CustomSelect from '@/components/ui/customSelect';
import { CardVariants } from '@business-entities';
import { EntityStatusEnum } from '@common';
import { DialogWrapper, Form } from '@components';
import { useCardContext } from '../../context/card-context-provider';

const CardUpdatingModal = () => {
	const { modal, schema, updating } = useCardContext();

	return (
		<DialogWrapper
			action="update"
			isOpen={modal.isUpdatingModal}
			onClose={modal.onCloseUpdating}
			title="Редактировать"
			buttonForm="update-card"
		>
			<Form {...schema}>
				<form
					id="update-card"
					className="w-full flex flex-col gap-4"
					onSubmit={schema.handleSubmit(updating.onUpdate)}
				>
					<CustomSelect
						control={schema.control}
						name="type"
						placeholder="Тип"
						className="py-3.5"
						data={[
							{ label: 'Туристическая', value: CardVariants.TOURIST },
							{ label: 'Патриотическая', value: CardVariants.COMPATRIOT },
						]}
					/>

					<CustomSelect
						control={schema.control}
						name="status"
						placeholder="Тип"
						className="py-3.5"
						data={[
							{ label: 'Активная', value: EntityStatusEnum.ENABLE },
							{ label: 'Не активная', value: EntityStatusEnum.DISABLE },
						]}
					/>

					<CustomCalendar
						control={schema.control}
						name="expire_date"
						placeholder="Срок истечения"
						ButtonClassName="shadow-none"
						showTime
						disableRuleFlag={(date) => date < new Date()}
						disablePortal
					/>
				</form>
			</Form>
		</DialogWrapper>
	);
};

export default CardUpdatingModal;
