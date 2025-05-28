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

	const setContactsSchema = (value: Record<SocialMediaKey, string>) => {
		schema.setValue('contacts', value, { shouldDirty: true });
	};

	const triggerContacts = () => {
		schema.trigger('contacts');
	};

	const setPhoneToSchema = (value: string | null) => {
		schema.setValue('contacts.phone', value, { shouldDirty: true });
	};

	useEffect(() => {
		const entries = Object.entries(contacts) as [SocialMediaKey, string][];
		setList(entries.map(([title, value]) => ({ title, value })));

		const phoneStr = contacts.phone;

		if (phoneStr) {
			const phoneArr = phoneStr
				.split(';')
				.map((p: string) => p.trim())
				.filter(Boolean);
			setPhones(phoneArr);
		}
	}, [contacts]);

	const onClick = (key: SocialMediaKey) => {
		const existing = list.find((item) => item.title === key);

		if (existing) {
			setSelected(existing);
		} else {
			setSelected({ title: key, value: '' });
		}
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
			{} as Record<SocialMediaKey, string>,
		);

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
			{} as Record<SocialMediaKey, string>,
		);

		setContactsSchema(updated);
		triggerContacts();
		setSelected(null);
	};

	const addPhone = () => {
		const trimmed = phoneInput.trim();
		if (!trimmed) return;

		setPhones((prev) => [...prev, trimmed]);
		setPhoneInput('');

		const newValue = [...phones, trimmed].join('; ');
		onChange(newValue);
		setPhoneToSchema(newValue);
		triggerContacts();
	};

	const removePhone = (index: number) => {
		const updated = phones.filter((_, i) => i !== index);
		setPhones(updated);
		onChange(updated.join('; '));
		setPhoneToSchema(updated.length ? updated.join('; ') : null);
		triggerContacts();
	};

	const isActive = (key: SocialMediaKey) => list.some((item) => item.title === key && item.value);

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
