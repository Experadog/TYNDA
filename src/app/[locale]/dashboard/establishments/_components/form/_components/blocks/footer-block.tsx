import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import type { EstablishmentDetailed } from '@business-entities';
import type { EstablishmentSchema } from '@common';
import { Button } from '@components';
import EstablishmentPreview from '../../../establishment-preview';

type Props = {
	isUpdatingMode: boolean;
	schema: EstablishmentSchema;
	item?: EstablishmentDetailed;
};

const FooterBlock = ({ isUpdatingMode, schema, item }: Props) => {
	const onReset = () => {
		schema.reset();
	};

	return (
		<div className="flex gap-3 justify-end items-center w-full">
			{isUpdatingMode && (
				<>
					<Link
						className="text-yellow hover:underline  mr-auto"
						href={PAGES.ESTABLISHMENT}
					>
						Отменить редактирование
					</Link>

					<EstablishmentPreview item={item} />

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
