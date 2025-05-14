import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import type { EstablishmentSchema } from '@common';
import { Button } from '@components';

type Props = {
	isUpdatingMode: boolean;
	schema: EstablishmentSchema;
};

const FooterBlock = ({ isUpdatingMode, schema }: Props) => {
	const onReset = () => {
		schema.reset();
	};

	return (
		<div className="flex gap-3 justify-end items-center w-full">
			{isUpdatingMode && (
				<>
					<Link className="text-yellow hover:underline" href={PAGES.DASHBOARD}>
						Отменить редактирование
					</Link>

					<Button
						disableAnimation
						className="text-sm rounded-xl py-5 disabled:opacity-15"
						variant={'yellow'}
						type="button"
						disabled={!schema.formState.isDirty}
						onClick={onReset}
					>
						Сбросить изменения
					</Button>
				</>
			)}

			<Button
				disableAnimation
				className="text-sm rounded-xl py-5"
				variant={'yellow'}
				disabled={!schema.formState.isDirty}
				type="submit"
			>
				Сохранить все изменения
			</Button>
		</div>
	);
};

export default FooterBlock;
