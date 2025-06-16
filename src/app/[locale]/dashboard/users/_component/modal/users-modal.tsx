'use client';

import type { UserFormValues } from '@common';
import { DialogWrapper } from '@components';
import { useUsersContext } from '../../context/users-context-provider';
import UsersForm from '../form/users-form';

const UsersModal = () => {
	const { modal, schema, creation } = useUsersContext();
	const {
		actions: { onClose },
		states: { isOpen, selectedUser },
	} = modal;

	const handleSubmit = async (values: UserFormValues) => {
		if (!selectedUser) {
			await creation.onCreate(values);
		}
	};

	return (
		<DialogWrapper
			isOpen={isOpen}
			onClose={onClose}
			action={selectedUser ? 'update' : 'create'}
			title={selectedUser ? 'Редактировать' : 'Создать'}
			buttonForm="users-form"
		>
			<UsersForm schema={schema} onClose={onClose} onSubmit={handleSubmit} />
		</DialogWrapper>
	);
};

export default UsersModal;
