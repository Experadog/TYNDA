'use client';

import type { UserFormValues } from '@common';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components';
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
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-background_1 rounded-xl font-roboto">
				<DialogHeader>
					<DialogTitle>{selectedUser ? 'Редактировать' : 'Создать'}</DialogTitle>
				</DialogHeader>

				<UsersForm schema={schema} onClose={onClose} onSubmit={handleSubmit} />
			</DialogContent>
		</Dialog>
	);
};

export default UsersModal;
