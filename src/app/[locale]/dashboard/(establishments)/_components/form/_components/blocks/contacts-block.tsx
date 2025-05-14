import CustomInput from '@/components/ui/customInput';
import { SOCIAL_MEDIAS } from '@/lib';
import type { EstablishmentSchema, SocialMediaKey } from '@common';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@components';
import { Check, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useContactAdditionUseCase } from '../../../../use-case/other/useContactAdditionUseCase';

type Props = {
	schema: EstablishmentSchema;
};

const ContactsBlock = ({ schema }: Props) => {
	const {
		actions: { onChange, onClick, onDelete, onSave, addPhone, removePhone, setPhoneInput },
		states: { isActive, selected, phones, phoneInput },
	} = useContactAdditionUseCase({ schema });

	const renderValidationErrors = () => {
		const errObj = schema.formState.errors.contacts;
		if (!errObj || typeof errObj !== 'object') return null;

		return (
			<div className="flex flex-col items-end gap-2 text-error text-sm">
				{Object.entries(errObj).map(([key, error]) => {
					const message =
						typeof error === 'object' && error !== null && 'message' in error
							? (error as { message?: string }).message
							: String(error);
					return (
						<span key={key} className="text-sm font-semibold numeric text-error">
							{SOCIAL_MEDIAS[key as SocialMediaKey]?.title ?? key}: {message}
						</span>
					);
				})}
			</div>
		);
	};

	function ActionButton({
		action,
		bgColor,
		onClick: customClick,
	}: {
		action: 'delete' | 'save' | 'edit';
		bgColor: string;
		onClick?: () => void;
	}) {
		const handleClick = () => {
			if (customClick) return customClick();

			switch (action) {
				case 'delete':
					onDelete();
					break;
				case 'edit':
					onSave();
					break;
				case 'save':
					onSave();
					break;
			}
		};

		return (
			<Button
				onClick={handleClick}
				className="h-full rounded-full"
				style={{ backgroundColor: bgColor }}
				variant="default"
				disableAnimation
			>
				{action === 'delete' && <Trash color="white" />}
				{action === 'save' && <Plus color="white" />}
				{action === 'edit' && <Check color="white" />}
			</Button>
		);
	}

	return (
		<div className="flex flex-col gap-4 font-roboto w-full">
			<p className="text-foreground_1 text-base font-medium">Добавьте контакты</p>
			<div className="flex items-center gap-4 w-full flex-wrap">
				{(
					Object.entries(SOCIAL_MEDIAS) as [
						SocialMediaKey,
						(typeof SOCIAL_MEDIAS)[SocialMediaKey],
					][]
				).map(([key, item]) => {
					const active = key !== 'phone' && isActive(key);
					const isPhoneActive = key === 'phone' && phones.length;

					return (
						<Tooltip key={key}>
							<TooltipTrigger
								type="button"
								onClick={() => onClick(key)}
								className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition hover:scale-90 cursor-pointer shrink-0 ${
									active || isPhoneActive
										? 'bg-yellow'
										: 'bg-foreground_2 hover:bg-yellow'
								}`}
							>
								<Image
									alt={item.title}
									src={item.icon}
									width={24}
									height={24}
									className="object-contain h-6 w-6"
								/>
							</TooltipTrigger>
							<TooltipContent className="bg-background_3">
								<p className="text-sm font-semibold">{SOCIAL_MEDIAS[key].title}</p>
							</TooltipContent>
						</Tooltip>
					);
				})}
			</div>

			{selected && selected.title !== 'phone' && (
				<div className="flex gap-2 items-center h-12">
					<CustomInput
						placeholder={`Ссылка на ${SOCIAL_MEDIAS[selected.title].title}`}
						value={selected.value || ''}
						onChange={(e) => onChange(e.target.value)}
						className="w-full h-full"
					/>

					{isActive(selected.title) ? (
						<>
							<ActionButton action="delete" bgColor="var(--error)" />
							<ActionButton action="edit" bgColor="var(--success)" />
						</>
					) : (
						<ActionButton action="save" bgColor="var(--yellow)" />
					)}
				</div>
			)}

			{selected && selected.title === 'phone' && (
				<div className="flex flex-col gap-3">
					<div className="flex gap-2 items-center h-12">
						<CustomInput
							placeholder="Введите номер телефона"
							value={phoneInput}
							onChange={(e) => setPhoneInput(e.target.value)}
							className="w-full h-full"
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									addPhone();
								}
							}}
						/>
						<ActionButton action="save" bgColor="var(--yellow)" onClick={addPhone} />
					</div>

					{phones.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{phones.map((phone, index) => (
								<div
									key={phone}
									className="bg-background_3 px-3 py-2 rounded-full flex items-center gap-2"
								>
									<span className="text-sm">{phone}</span>
									<button
										type="button"
										onClick={() => removePhone(index)}
										className="text-error hover:opacity-70"
									>
										<Trash size={14} />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{renderValidationErrors()}
		</div>
	);
};

export default ContactsBlock;
