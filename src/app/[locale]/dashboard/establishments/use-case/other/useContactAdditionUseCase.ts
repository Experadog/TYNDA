import type { EstablishmentSchema, SocialMedia, SocialMediaKey } from '@common';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

type Props = {
	schema: EstablishmentSchema;
};

export function useContactAdditionUseCase({ schema }: Props) {
	const contacts =
		useWatch({
			control: schema.control,
			name: 'contacts',
		}) || {};

	const [selected, setSelected] = useState<SocialMedia | null>(null);
	const [list, setList] = useState<SocialMedia[]>([]);

	const [phones, setPhones] = useState<string[]>([]);
	const [phoneInput, setPhoneInput] = useState<string>('');

	const setContactsSchema = (value: Record<SocialMediaKey, unknown>) => {
		schema.setValue('contacts', value, { shouldDirty: true });
	};

	const triggerContacts = () => {
		schema.trigger('contacts');
	};

	const setPhoneToSchema = (value: string[] | null) => {
		schema.setValue('contacts.phone', value, { shouldDirty: true });
	};

	useEffect(() => {
		const entries = Object.entries(contacts) as [SocialMediaKey, unknown][];
		const mediaList = entries
			.filter(([key]) => key !== 'phone')
			.map(([title, value]) => ({ title, value: value as string }));

		setList(mediaList);

		const phonesFromSchema = contacts.phone;
		if (Array.isArray(phonesFromSchema)) {
			setPhones(phonesFromSchema.filter((p): p is string => typeof p === 'string'));
		}
	}, [contacts]);

	const onClick = (key: SocialMediaKey) => {
		const existing = list.find((item) => item.title === key);
		setSelected(existing ?? { title: key, value: '' });
	};

	const onChange = (value: string) => {
		if (selected) {
			setSelected({ ...selected, value });
		}
	};

	const onSave = () => {
		if (!selected) return;

		const newList = list.filter((item) => item.title !== selected.title).concat(selected);
		setList(newList);

		const updated = newList.reduce(
			(acc, item) => {
				if (typeof item.value === 'string' && item.value.trim()) {
					acc[item.title as SocialMediaKey] = item.value;
				}
				return acc;
			},
			{} as Record<SocialMediaKey, unknown>,
		);

		updated.phone = phones;

		setContactsSchema(updated);
		triggerContacts();
		setSelected(null);
	};

	const onDelete = () => {
		if (!selected) return;

		const newList = list.filter((item) => item.title !== selected.title);
		setList(newList);

		const updated = newList.reduce(
			(acc, item) => {
				if (typeof item.value === 'string' && item.value.trim()) {
					acc[item.title as SocialMediaKey] = item.value;
				}
				return acc;
			},
			{} as Record<SocialMediaKey, unknown>,
		);

		updated.phone = phones;

		setContactsSchema(updated);
		triggerContacts();
		setSelected(null);
	};

	const addPhone = () => {
		const trimmed = phoneInput.trim();
		if (!trimmed || phones.includes(trimmed)) return;

		const updatedPhones = [...phones, trimmed];
		setPhones(updatedPhones);
		setPhoneInput('');

		setPhoneToSchema(updatedPhones);
		triggerContacts();
	};

	const removePhone = (index: number) => {
		const updatedPhones = phones.filter((_, i) => i !== index);
		setPhones(updatedPhones);
		setPhoneToSchema(updatedPhones.length ? updatedPhones : null);
		triggerContacts();
	};

	const isActive = (key: SocialMediaKey) =>
		key === 'phone' ? phones.length > 0 : list.some((item) => item.title === key && item.value);

	return {
		actions: {
			onChange,
			onSave,
			onDelete,
			onClick,
			setPhoneInput,
			addPhone,
			removePhone,
		},

		states: {
			selected,
			isActive,
			list,
			phoneInput,
			phones,
		},
	};
}
