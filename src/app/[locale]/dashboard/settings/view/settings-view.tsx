'use client';

import PageSettings from '../_components/page-settings/page-settings';
import ProfileSettings from '../_components/profile-settings/profile-settings';

const SettingsView = () => {
	return (
		<div className="flex flex-col gap-10">
			<PageSettings />
			<ProfileSettings />
		</div>
	);
};

export default SettingsView;
