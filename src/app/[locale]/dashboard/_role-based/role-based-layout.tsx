'use server';
import type { ReactNode } from 'react';
import { executeRoleRequests } from '../requests';
import { roleContextMap } from './role-context-map';

export default async function RoleBasedLayout({ children }: { children: ReactNode }) {
	const result = await executeRoleRequests();

	const Component = roleContextMap[result.roleType] as React.FC<{
		data: typeof result.data;
		children?: ReactNode;
	}>;

	return <Component data={result.data}>{children}</Component>;
}
